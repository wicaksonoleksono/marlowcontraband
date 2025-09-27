"use client";

import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
// Studio-like environment (no external HDR files needed)
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (!mountRef.current || !isMounted) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera — tight framing
    const camera = new THREE.PerspectiveCamera(
      15, // your request
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(-1.8, 1.9, 6.2);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.localClippingEnabled = true; // needed for material clipping
    renderer.shadowMap.enabled = false;

    mountRef.current.appendChild(renderer.domElement);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.5).texture;
    scene.environment = env; // reflections for PBR materials
    // scene.background = env; // uncomment if you want a visible studio backdrop

    // Lights (still help define form even with env map)
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(5, 6, 4);
    scene.add(key);

    const fill = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(fill);

    // Clipping plane: facing camera along +Z viewing direction
    // Normal (0, 0, -1) points toward the camera placed in +Z.
    const clipPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);
    // Increase constant => clip closer to camera; decrease => deeper into scene.

    // Metallic aluminum material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xd9d9d9, // light grey base
      metalness: 1.0, // full metal (env map gives reflections)
      roughness: 0.28, // slight blur = brushed vibe
      reflectivity: 0.95,
      clearcoat: 0.7,
      clearcoatRoughness: 0.12,
      clippingPlanes: [clipPlane], // <— enable the slice
      // clipShadows: false, // irrelevant with shadows off
    });

    // Geometry
    const geometry = new THREE.TorusKnotGeometry(1.0, 0.2, 150, 32);
    const object = new THREE.Mesh(geometry, material);
    object.rotation.x = Math.PI; // 180°
    object.rotation.z = Math.PI; // 180°
    scene.add(object);

    // Optional “floor” — inert without shadows; keep if you later enable them
    // const floor = new THREE.Mesh(
    //   new THREE.PlaneGeometry(20, 20),
    //   new THREE.ShadowMaterial({ opacity: 0.2 })
    // );
    // floor.rotation.x = -Math.PI / 2;
    // floor.position.y = -1.6;
    // floor.receiveShadow = true;
    // scene.add(floor);

    // Animation — slower spin
    const animate = () => {
      object.rotation.y += 0.0012; // slower than before
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Debug: nudge the slice depth with [ and ]
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "]") clipPlane.constant += 0.05;
      if (e.key === "[") clipPlane.constant -= 0.05;
    };
    window.addEventListener("keydown", onKey);

    // Cleanup
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", onKey);

      // Remove canvas
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose
      geometry.dispose();
      material.dispose();
      pmrem.dispose();
      env.dispose?.(); // in newer three it’s fine to skip; safe check

      renderer.dispose();
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ background: "transparent", zIndex: -1 }}
    />
  );
};

export default ThreeBackground;
