"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLenis } from "../../context/LenisContext";

type Mode = "word" | "char";

interface Props {
  text: string;
  mode?: Mode;
}

export default function StreamingTextScroll({ text, mode = "word" }: Props) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [count, setCount] = useState(0);
  const lenis = useLenis();

  const tokens = useMemo(() => {
    if (mode === "char") return Array.from(text);
    return text
      .split(" ")
      .map((w, i, arr) => (i < arr.length - 1 ? w + " " : w));
  }, [text, mode]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh * 0.4 - r.top) / r.height));
      const next = Math.floor(progress * tokens.length);
      setCount((prevCount) => (next !== prevCount ? next : prevCount));
    };

    if (lenis) {
      lenis.on("scroll", update);
      update(); // <-- REMOVE THIS LINE
      return () => {
        lenis.off("scroll", update);
      };
    }

    // Fallback logic
    const onScroll = () => update();
    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // <-- AND REMOVE THIS LINE
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [lenis, tokens.length]); // Updated dependency array for performance

  const shown = useMemo(
    () => tokens.slice(0, count).join(mode === "char" ? "" : ""),
    [tokens, count, mode]
  );

  return (
    <p ref={ref}>
      {shown}
      <span className="animate-pulse">{count < tokens.length ? "|" : ""}</span>
    </p>
  );
}
