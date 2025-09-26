// app/components/animate/StreamingTextOnLock.tsx
"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "../../context/LenisContext";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
  mode?: "char" | "word";
  replay?: boolean; // NEW: if true, allow replay. default false (one-shot).
}

export default function StreamingTextOnLock({
  text,
  mode = "char",
  replay = false,
}: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [count, setCount] = useState(0);
  const lenis = useLenis();

  const isActive = useRef(false);
  const progress = useRef(0);
  const hasPlayed = useRef(false); // NEW

  const tokens = useMemo(() => {
    if (mode === "char") return Array.from(text.trim());
    return text
      .trim()
      .split(" ")
      .map((w, i, arr) => (i < arr.length - 1 ? w + " " : w));
  }, [text, mode]);

  useEffect(() => {
    if (!lenis) return;

    let st: ScrollTrigger | null = null; // NEW
    const handleWheel = (e: WheelEvent) => {
      if (!isActive.current || hasPlayed.current) return;

      const scrollDelta = e.deltaY;
      const scrollPerToken = 3;
      const totalScrollRequired = tokens.length * scrollPerToken;

      progress.current += scrollDelta / totalScrollRequired;
      progress.current = Math.max(0, Math.min(1, progress.current));

      const newCount = Math.floor(progress.current * tokens.length);
      setCount(newCount);

      // Finished: release scroll, never re-arm
      if (progress.current >= 1) {
        hasPlayed.current = true; // NEW
        isActive.current = false;
        lenis.start();

        // Tear down listeners and trigger so it won't re-fire. // NEW
        window.removeEventListener("wheel", handleWheel as any);
        if (st) st.kill();
      }
    };

    const ctx = gsap.context(() => {
      st = ScrollTrigger.create({
        trigger: ref.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          if (hasPlayed.current && !replay) return; // NEW: ignore after first run
          isActive.current = true;
          lenis.stop();
        },
        onLeave: () => {
          if (isActive.current) lenis.start();
          isActive.current = false;
        },
        onLeaveBack: () => {
          // If replay is false or we already played, don't reset. // NEW
          if (hasPlayed.current && !replay) return;

          // Otherwise allow replay by resetting progress. // NEW
          if (replay) {
            isActive.current = false;
            lenis.start();
            progress.current = 0;
            setCount(0);
          }
        },
      });

      window.addEventListener("wheel", handleWheel, { passive: true });
    }, ref);

    return () => {
      window.removeEventListener("wheel", handleWheel as any);
      if (st) st.kill();
      ctx.revert();
      lenis.start();
    };
  }, [lenis, tokens.length, replay]);

  const shown = useMemo(() => tokens.slice(0, count).join(""), [tokens, count]);

  return (
    <p ref={ref}>
      {shown}
      <span className="animate-pulse">{count < tokens.length ? "|" : ""}</span>
    </p>
  );
}
