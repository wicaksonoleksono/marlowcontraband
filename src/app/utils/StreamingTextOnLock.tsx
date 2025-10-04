// app/components/animate/StreamingTextOnLock.tsx
"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "../hooks/LenisContext";
gsap.registerPlugin(ScrollTrigger);

// Helper function to extract plain text from HTML for streaming logic
function extractPlainText(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

// Helper function to rebuild HTML with streamed characters
function buildStreamedHtml(html: string, charCount: number): string {
  let plainTextIndex = 0;
  let result = "";
  let i = 0;

  while (i < html.length && plainTextIndex < charCount) {
    if (html[i] === "<") {
      // Find the end of the tag
      const tagEnd = html.indexOf(">", i);
      if (tagEnd !== -1) {
        // Add the entire tag
        result += html.substring(i, tagEnd + 1);
        i = tagEnd + 1;
      } else {
        break;
      }
    } else {
      // Regular character - count it and add if within limit
      if (plainTextIndex < charCount) {
        result += html[i];
        plainTextIndex++;
      }
      i++;
    }
  }

  // Close any unclosed tags
  const openTags: string[] = [];
  const tagRegex = /<(\/?)([\w-]+)(?:\s[^>]*)?>/g;
  let match;

  while ((match = tagRegex.exec(result)) !== null) {
    const isClosing = match[1] === "/";
    const tagName = match[2];

    if (isClosing) {
      openTags.pop();
    } else if (!["br", "hr", "img", "input"].includes(tagName.toLowerCase())) {
      openTags.push(tagName);
    }
  }

  // Close remaining open tags
  while (openTags.length > 0) {
    const tagToClose = openTags.pop();
    result += `</${tagToClose}>`;
  }

  return result;
}

interface Props {
  text: string;
  mode?: "char" | "word";
  replay?: boolean; // NEW: if true, allow replay. default false (one-shot).
  allowHtml?: boolean; // NEW: if true, parse simple HTML tags
}

export default function StreamingTextOnLock({
  text,
  mode = "char",
  replay = false,
  allowHtml = false,
}: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [count, setCount] = useState(0);
  const lenis = useLenis();

  const isActive = useRef(false);
  const progress = useRef(0);
  const hasPlayed = useRef(false); // NEW

  const tokens = useMemo(() => {
    const workingText = allowHtml ? extractPlainText(text.trim()) : text.trim();
    if (mode === "char") return Array.from(workingText);
    return workingText
      .split(" ")
      .map((w, i, arr) => (i < arr.length - 1 ? w + " " : w));
  }, [text, mode, allowHtml]);

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
        window.removeEventListener("wheel", handleWheel as EventListener);
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
      window.removeEventListener("wheel", handleWheel as EventListener);
      if (st) st.kill();
      ctx.revert();
      lenis.start();
    };
  }, [lenis, tokens.length, replay]);

  const shown = useMemo(() => {
    if (allowHtml) {
      const plainTextCount = tokens.slice(0, count).join("").length;
      return buildStreamedHtml(text.trim(), plainTextCount);
    }
    return tokens.slice(0, count).join("");
  }, [tokens, count, allowHtml, text]);

  return (
    <p ref={ref} className="border-r-4 border-[var(--color-primary)]  pr-7 ">
      {allowHtml ? <span dangerouslySetInnerHTML={{ __html: shown }} /> : shown}
      <span className="animate-pulse">{count < tokens.length ? "|" : ""}</span>
    </p>
  );
}
