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
}

export default function StreamingTextOnLock({ text, mode = "char" }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [count, setCount] = useState(0);
  const lenis = useLenis();
  const isActive = useRef(false);
  const progress = useRef(0);
  const tokens = useMemo(() => {
    if (mode === "char") return Array.from(text.trim());
    return text
      .trim()
      .split(" ")
      .map((w, i, arr) => (i < arr.length - 1 ? w + " " : w));
  }, [text, mode]);

  // Effect for setting up the scroll trigger and wheel listener
  useEffect(() => {
    if (!lenis) return;

    // Use GSAP Context for easy cleanup
    const ctx = gsap.context(() => {
      // 1. SET UP THE TRIGGER
      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          isActive.current = true;
          lenis.stop();
        },
        onLeave: () => {
          isActive.current = false;
          lenis.start();
        },
        onLeaveBack: () => {
          isActive.current = false;
          lenis.start();
          progress.current = 0;
          setCount(0);
        },
      });

      // 2. SET UP THE WHEEL LISTENER
      const handleWheel = (e: WheelEvent) => {
        if (!isActive.current) return;

        // --- 👇 THE FIX IS HERE 👇 ---

        const scrollDelta = e.deltaY;

        // 💡 Define how much "scroll distance" is needed per character.
        // Higher number = slower, more granular reveal. Lower = faster.
        const scrollPerToken = 50;

        // 💡 Calculate the total scroll "distance" required for the whole text.
        const totalScrollRequired = tokens.length * scrollPerToken;

        // 💡 Calculate the progress increment based on this total distance.
        const progressIncrement = scrollDelta / totalScrollRequired;
        progress.current += progressIncrement;

        // --- 👆 END OF FIX 👆 ---

        // Clamp the progress between 0 and 1
        progress.current = Math.max(0, Math.min(1, progress.current));

        // Update the visible character count
        const newCount = Math.floor(progress.current * tokens.length);
        setCount(newCount);

        // 3. UNLOCK WHEN DONE
        if (progress.current >= 1) {
          isActive.current = false;
          lenis.start();
        }
      };

      window.addEventListener("wheel", handleWheel);

      // Cleanup function
      return () => {
        window.removeEventListener("wheel", handleWheel);
        st.kill();
        lenis.start();
      };
    }, ref);

    return () => ctx.revert();
  }, [lenis, tokens.length]);

  const shown = useMemo(() => {
    return tokens.slice(0, count).join("");
  }, [tokens, count]);

  return (
    <p ref={ref}>
      {shown}
      <span className="animate-pulse">{count < tokens.length ? "|" : ""}</span>
    </p>
  );
}
