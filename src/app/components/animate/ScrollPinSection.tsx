"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "../../context/LenisContext";

interface PinProps {
  /** How long the pin lasts in viewport-heights (e.g., 250 = 2.5 screens) */
  pinHeightVh?: number;
  /** Sticky top offset in viewport-heights (e.g., 30 = stick around 30vh) */
  topOffsetVh?: number;
  /** Called every scroll with progress 0..1 while in range */
  onProgress?: (t: number) => void;
  children: React.ReactNode;
}

export default function ScrollPinSection({
  pinHeightVh = 250,
  topOffsetVh = 30,
  onProgress,
  children,
}: PinProps) {
  const lenis = useLenis();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const compute = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const rect = wrap.getBoundingClientRect();
    const vh = window.innerHeight;

    // Scroll start where wrapper hits top; end after pinHeightVh viewport heights
    const start = window.scrollY + rect.top; // document start of wrapper
    const pinLenPx = (pinHeightVh / 100) * vh; // how long we "scroll through" the pin
    const y = window.scrollY;

    const t = Math.max(0, Math.min(1, (y - start) / pinLenPx));
    setProgress(t);
    onProgress?.(t);
  }, [onProgress, pinHeightVh]);

  useEffect(() => {
    const update = () => compute();

    if (lenis) {
      lenis.on("scroll", update);
      update();
      return () => lenis.off("scroll", update);
    }

    // Fallback if Lenis missing
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [lenis, compute]);

  const topPx = `calc(${topOffsetVh ?? 0}vh)`;

  return (
    <div
      ref={wrapRef}
      style={{ height: `calc(${pinHeightVh}vh + 100vh)` }} // extra 100vh so it unpins cleanly
      className="relative"
    >
      <div className="sticky" style={{ top: topPx }}>
        {/* Expose progress to children via render-prop OR clone; simplest is context or function child.
            To keep it minimal here, we clone if child is a function. */}
        {typeof children === "function"
          ? (children as any)(progress)
          : children}
      </div>
    </div>
  );
}
