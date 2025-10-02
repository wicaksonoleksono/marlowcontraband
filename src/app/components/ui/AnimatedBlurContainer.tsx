"use client";

import React, { useRef, useState } from "react";

type BrushBlurProps = {
  children: React.ReactNode;

  // only Tailwind/CSS hooks for the container itself:
  className?: string;
  style?: React.CSSProperties;

  // all behavior is configured here (container-level)
  radiusPx?: number; // brush radius
  hardStopPct?: number; // inner solid %
  softStopPct?: number; // fade end %
  opacity?: number; // brush layer opacity 0..1
  spotlightZ?: number; // z-index of spotlight (usually 0)
  contentZ?: number; // z-index of content (usually 10)
  gradient?: string; // gradient under the brush
};

const BrushBlur: React.FC<BrushBlurProps> = ({
  children,
  className = "",
  style,

  radiusPx = 140,
  hardStopPct = 55,
  softStopPct = 80,
  opacity = 0.25,
  spotlightZ = 0, // sits “under” content by default
  contentZ = 10,
  gradient = `
    radial-gradient(circle at center, var(--brush-color-2) 0%, var(--brush-color-1) 25%, var(--brush-color-3) 50%, var(--brush-color-1) 75%, var(--brush-color-2) 100%),
    conic-gradient(from 0deg at center, var(--brush-color-2) 0deg, var(--brush-color-1) 120deg, var(--brush-color-3) 240deg, var(--brush-color-2) 360deg)
  `,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden backdrop-blur-md ${className}`}
      style={style}
    >
      {/* spotlight layer (always on) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: spotlightZ,
          opacity: isHovered ? opacity : 0,
          background: gradient,
          backgroundSize: "200% 200%",
          animation: "inkMove 8s ease-in-out infinite",
          transition: isHovered ? "opacity 0.5s ease-in-out" : "opacity 0.5s ease-in-out",
          WebkitMaskImage: `
            radial-gradient(${radiusPx * 0.8}px ${radiusPx * 1.2}px at calc(var(--mx,-1000px) + 20px) calc(var(--my,-1000px) - 10px),
              rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) ${hardStopPct}%, rgba(0,0,0,0) ${softStopPct}%),
            radial-gradient(${radiusPx * 1.1}px ${radiusPx * 0.9}px at calc(var(--mx,-1000px) - 15px) calc(var(--my,-1000px) + 25px),
              rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) ${hardStopPct}%, rgba(0,0,0,0) ${softStopPct}%),
            radial-gradient(${radiusPx * 0.9}px ${radiusPx * 1.1}px at calc(var(--mx,-1000px) + 10px) calc(var(--my,-1000px) + 15px),
              rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) ${hardStopPct}%, rgba(0,0,0,0) ${softStopPct}%)
          `,
          maskImage: `
            radial-gradient(${radiusPx * 0.8}px ${radiusPx * 1.2}px at calc(var(--mx,-1000px) + 20px) calc(var(--my,-1000px) - 10px),
              rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) ${hardStopPct}%, rgba(0,0,0,0) ${softStopPct}%),
            radial-gradient(${radiusPx * 1.1}px ${radiusPx * 0.9}px at calc(var(--mx,-1000px) - 15px) calc(var(--my,-1000px) + 25px),
              rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) ${hardStopPct}%, rgba(0,0,0,0) ${softStopPct}%),
            radial-gradient(${radiusPx * 0.9}px ${radiusPx * 1.1}px at calc(var(--mx,-1000px) + 10px) calc(var(--my,-1000px) + 15px),
              rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) ${hardStopPct}%, rgba(0,0,0,0) ${softStopPct}%)
          `,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />

      {/* content — your children only need className/style */}
      <div className="relative" style={{ zIndex: contentZ }}>
        {children}
      </div>

      <style>{`
        @keyframes inkMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes blobMorph {
          0% { 
            transform: scale(1, 1) rotate(0deg);
            filter: blur(0px);
          }
          25% { 
            transform: scale(1.1, 0.9) rotate(90deg);
            filter: blur(1px);
          }
          50% { 
            transform: scale(0.9, 1.2) rotate(180deg);
            filter: blur(2px);
          }
          75% { 
            transform: scale(1.2, 0.8) rotate(270deg);
            filter: blur(1px);
          }
          100% { 
            transform: scale(1, 1) rotate(360deg);
            filter: blur(0px);
          }
        }
      `}</style>
    </div>
  );
};

export default BrushBlur;
