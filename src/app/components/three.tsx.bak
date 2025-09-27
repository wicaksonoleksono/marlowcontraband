"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// global cache so PMREM/env is built once per session
let __ENV_TEXTURE__: THREE.Texture | null = null;

export default function ThreeBackgroundCanvas() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!wrapRef.current || !canvasRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera (same framing as your last good state)
    const camera = new THREE.PerspectiveCamera(20, 1, 0.1, 200);
    camera.position.set(-1.8, 1.9, 6.2);
    camera.lookAt(0, 0, 0);

    // Renderer bound to our <canvas>
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
      stencil: false,
      depth: true,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
    });
    const DPR = Math.min(window.devicePixelRatio || 1, 1.25);
    renderer.setPixelRatio(DPR);
    renderer.setClearColor(0x000000, 0);
    renderer.localClippingEnabled = true;
    renderer.shadowMap.enabled = false;

    // Build or reuse environment
    let pmrem: THREE.PMREMGenerator | null = null;
    if (!__ENV_TEXTURE__) {
      pmrem = new THREE.PMREMGenerator(renderer);
      __ENV_TEXTURE__ = pmrem.fromScene(new RoomEnvironment(), 0.5).texture;
    }
    scene.environment = __ENV_TEXTURE__!;

    // Lights
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(5, 6, 4);
    scene.add(key);
    const fill = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(fill);

    // Clipping plane
    const clipPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);

    // Material — metallic aluminum
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xd9d9d9,
      metalness: 1.0,
      roughness: 0.28,
      reflectivity: 0.95,
      clearcoat: 0.7,
      clearcoatRoughness: 0.12,
      clippingPlanes: [clipPlane],
    });

    // Geometry
    const geometry = new THREE.TorusKnotGeometry(1.0, 0.2, 150, 32);
    const object = new THREE.Mesh(geometry, material);
    object.rotation.x = Math.PI; // 180°
    object.rotation.z = Math.PI; // 180°
    scene.add(object);

    // Size/resize to container (full screen by default)
    const resize = () => {
      const w = wrapRef.current!.clientWidth;
      const h = wrapRef.current!.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false); // don't force canvas CSS size
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapRef.current!);

    // Animation — always on (ignores prefers-reduced-motion per your request)
    const clock = new THREE.Clock();
    const BASE_SPEED = 0.1; // degrees/sec-ish (scaled by delta)

    const loop = () => {
      const dt = clock.getDelta();
      object.rotation.y += ((BASE_SPEED * Math.PI) / 180) * (dt * 60); // normalize to ~60fps feel
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    // Keyboard nudges for the slice depth
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "]") clipPlane.constant += 0.05;
      if (e.key === "[") clipPlane.constant -= 0.05;
    };
    window.addEventListener("keydown", onKey);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", onKey);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      pmrem?.dispose(); // only if we created it this mount
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1, background: "transparent" }}
    >
      {/* full-viewport canvas */}
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
