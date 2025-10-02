"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/** Tiny vertical gradient texture for the tube */
function makeGradientTexture(stops: [number, string][]) {
  const c = document.createElement("canvas");
  c.width = 1;
  c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createLinearGradient(0, 0, 0, 256);
  for (const [p, col] of stops) grad.addColorStop(p, col);
  g.fillStyle = grad;
  g.fillRect(0, 0, 1, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearMipMapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

/** Visible rect at z=0 plane for a perspective camera */
function getViewRect(cam: THREE.PerspectiveCamera) {
  const dist = Math.abs(cam.position.z); // z=0 plane
  const vH = 2 * dist * Math.tan(THREE.MathUtils.degToRad(cam.fov * 0.5));
  const vW = vH * cam.aspect;
  return { minX: -vW / 2, maxX: vW / 2, minY: -vH / 2, maxY: vH / 2 };
}

type Side = "left" | "right" | "top" | "bottom";

export default function EdgeRootCanvas({
  side = "left",
  lane = "left-0 w-full", // tailwind lane control
}: {
  side?: Side;
  lane?: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!wrapRef.current || !canvasRef.current) return;

    // Scene + camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(22, 1, 0.1, 200);
    camera.position.set(0, 0, 6);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;

    // Soft lights (no chrome)
    scene.add(new THREE.HemisphereLight(0xffffff, 0x888888, 0.7));
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(2, 3, 2);
    scene.add(dir);

    // Params
    const MAX_POINTS = 140;
    const STEP = 0.022;

    // View rect (updated on resize)
    let viewRect = getViewRect(camera);

    function spawnPoint(): THREE.Vector3 {
      const m = 0.01; // small inset
      if (side === "left") {
        const y = THREE.MathUtils.lerp(
          viewRect.minY,
          viewRect.maxY,
          Math.random()
        );
        return new THREE.Vector3(
          viewRect.minX + (viewRect.maxX - viewRect.minX) * m,
          y,
          0
        );
      }
      if (side === "right") {
        const y = THREE.MathUtils.lerp(
          viewRect.minY,
          viewRect.maxY,
          Math.random()
        );
        return new THREE.Vector3(
          viewRect.maxX - (viewRect.maxX - viewRect.minX) * m,
          y,
          0
        );
      }
      if (side === "top") {
        const x = THREE.MathUtils.lerp(
          viewRect.minX,
          viewRect.maxX,
          Math.random()
        );
        return new THREE.Vector3(
          x,
          viewRect.maxY - (viewRect.maxY - viewRect.minY) * m,
          0
        );
      }
      // bottom
      const x = THREE.MathUtils.lerp(
        viewRect.minX,
        viewRect.maxX,
        Math.random()
      );
      return new THREE.Vector3(
        x,
        viewRect.minY + (viewRect.maxY - viewRect.minY) * m,
        0
      );
    }

    // Field = gentle curl + pull to center (for tube1)
    function field1(v: THREE.Vector3, t: number) {
      const s = 0.7;
      const a = Math.sin((v.x + t) * s) + Math.cos((v.y - t) * s * 0.9);
      const b = Math.cos((v.x - t) * s * 0.8) - Math.sin((v.y + t) * s);
      const toC = new THREE.Vector2(-v.x * 0.25, -v.y * 0.25);
      return new THREE.Vector2(-b, a).multiplyScalar(0.45).add(toC);
    }

    // Independent field for tube2 - different pattern
    function field2(v: THREE.Vector3, t: number) {
      const s = 0.5;
      const a = Math.cos((v.x - t) * s * 1.2) + Math.sin((v.y + t) * s * 0.7);
      const b = Math.sin((v.x + t) * s * 0.6) + Math.cos((v.y - t) * s * 1.1);
      const toC = new THREE.Vector2(-v.x * 0.15, -v.y * 0.3);
      return new THREE.Vector2(a, -b).multiplyScalar(0.35).add(toC);
    }

    // Points for first tube
    const pts1: THREE.Vector3[] = [];
    const start1 = spawnPoint();
    pts1.push(start1.clone());

    // Points for second tube
    const pts2: THREE.Vector3[] = [];
    const start2 = spawnPoint();
    pts2.push(start2.clone());

    const inwardStep = (axis: "x" | "y") =>
      (axis === "x"
        ? viewRect.maxX - viewRect.minX
        : viewRect.maxY - viewRect.minY) * 0.012;

    // Initialize both tubes
    for (let i = 0; i < 4; i++) {
      // First tube
      const p1 = pts1[pts1.length - 1].clone();
      if (side === "left") p1.x += inwardStep("x");
      else if (side === "right") p1.x -= inwardStep("x");
      else if (side === "top") p1.y -= inwardStep("y");
      else p1.y += inwardStep("y");
      pts1.push(p1);

      // Second tube
      const p2 = pts2[pts2.length - 1].clone();
      if (side === "left") p2.x += inwardStep("x");
      else if (side === "right") p2.x -= inwardStep("x");
      else if (side === "top") p2.y -= inwardStep("y");
      else p2.y += inwardStep("y");
      pts2.push(p2);
    }

    // Material + initial tube
    const gradTex = makeGradientTexture([
      [0.0, "#ff7a7a"],
      [0.35, "#ffb36b"],
      [0.65, "#7ec8ff"],
      [1.0, "#9a8cff"],
    ]);
    const mat = new THREE.MeshPhysicalMaterial({
      map: gradTex,
      roughness: 0.85,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9,
      envMapIntensity: 0.25,
      depthWrite: false, // keeps text crisp
    });

    // First tube
    let curve1 = new THREE.CatmullRomCurve3(pts1, false, "catmullrom", 0.3);
    let geom1 = new THREE.TubeGeometry(curve1, 200, 0.045, 16, false);
    const tube1 = new THREE.Mesh(geom1, mat);
    tube1.renderOrder = -1;
    scene.add(tube1);

    // Second tube with slightly different material
    const mat2 = mat.clone();
    mat2.opacity = 0.7; // Make second tube slightly more transparent
    let curve2 = new THREE.CatmullRomCurve3(pts2, false, "catmullrom", 0.3);
    let geom2 = new THREE.TubeGeometry(curve2, 200, 0.035, 16, false); // Slightly thinner
    const tube2 = new THREE.Mesh(geom2, mat2);
    tube2.renderOrder = -1;
    scene.add(tube2);

    // Resize
    const resize = () => {
      const w = wrapRef.current!.clientWidth;
      const h = wrapRef.current!.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      viewRect = getViewRect(camera); // keep edge math correct
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapRef.current!);

    // Animate growth
    const clock = new THREE.Clock();
    let rebuildCooldown = 0;

    const loop = () => {
      const t = clock.getElapsedTime();

      // Update first tube
      const tip1 = pts1[pts1.length - 1].clone();
      const fv1 = field1(tip1, t);
      tip1.x += fv1.x * STEP;
      tip1.y += fv1.y * STEP;
      tip1.z = Math.sin((tip1.x + tip1.y + t) * 0.2) * 0.05;
      pts1.push(tip1);
      if (pts1.length > MAX_POINTS) pts1.shift();

      // Update second tube - completely independent movement
      const tip2 = pts2[pts2.length - 1].clone();
      const fv2 = field2(tip2, t * 1.3); // Different time scale
      tip2.x += fv2.x * STEP * 1.2; // Different speed
      tip2.y += fv2.y * STEP * 1.1;
      tip2.z = Math.cos((tip2.x - tip2.y + t * 0.8) * 0.3) * 0.08; // Different Z movement
      pts2.push(tip2);
      if (pts2.length > MAX_POINTS) pts2.shift();

      if (pts1.length >= 3 && --rebuildCooldown <= 0) {
        // Rebuild first tube
        curve1 = new THREE.CatmullRomCurve3(pts1, false, "catmullrom", 0.3);
        tube1.geometry.dispose();
        geom1 = new THREE.TubeGeometry(curve1, 200, 0.045, 16, false);
        tube1.geometry = geom1;

        // Rebuild second tube
        curve2 = new THREE.CatmullRomCurve3(pts2, false, "catmullrom", 0.3);
        tube2.geometry.dispose();
        geom2 = new THREE.TubeGeometry(curve2, 200, 0.035, 16, false);
        tube2.geometry = geom2;

        rebuildCooldown = 2;
      }

      // Different breathing for each tube
      tube1.rotation.z = THREE.MathUtils.lerp(
        tube1.rotation.z,
        0.06 * Math.sin(t * 0.2),
        0.05
      );
      tube2.rotation.z = THREE.MathUtils.lerp(
        tube2.rotation.z,
        0.04 * Math.sin(t * 0.15 + 1),
        0.03
      );

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      tube1.geometry.dispose();
      tube2.geometry.dispose();
      (tube1.material as THREE.Material).dispose();
      (tube2.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, [side]);

  return (
    <div
      ref={wrapRef}
      className={`fixed inset-y-0 ${lane} pointer-events-none z-0 mask-soft`}
      data-lenis-prevent
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      <style jsx global>{`
        .mask-soft {
          -webkit-mask-image: radial-gradient(
            120% 80% at 65% 50%,
            black 45%,
            transparent 78%
          );
          mask-image: radial-gradient(
            120% 80% at 65% 50%,
            black 45%,
            transparent 78%
          );
          opacity: 0.65;
        }
      `}</style>
    </div>
  );
}
