"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { pagesConfig } from "../../config/pages";
import { useLenis } from "../../context/LenisContext"; // 1. Import the hook!
// 2. Remove scrollTo from the props interface
interface HeaderProps {
  isScrollMode?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrollMode = false }) => {
  // 3. Get the lenis instance directly from our context
  const lenis = useLenis();
  const [activeSection, setActiveSection] = useState<string>("home");
  const [activeNavRect, setActiveNavRect] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Make sure lenis is available before trying to scroll
    if (!lenis) return;

    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");

    // 4. Use the scrollTo method from the lenis instance
    lenis.scrollTo(`#${targetId}`, { offset: -100 });
  };

  useEffect(() => {
    if (!lenis || !isScrollMode) return;

    const handleScroll = () => {
      const scrollY = lenis.scroll;

      // Check which section is currently in view
      for (const page of pagesConfig) {
        const element = document.querySelector(page.anchor);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If section is in viewport center (accounting for header height)
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveSection(page.id);

            // Update active nav item position for mask
            if (isScrollMode) {
              const navElement = document.querySelector(
                `[data-section="${page.id}"]`
              );
              if (navElement) {
                const navRect = navElement.getBoundingClientRect();
                const headerElement = navElement.closest(".fixed");
                if (headerElement) {
                  const headerRect = headerElement.getBoundingClientRect();
                  setActiveNavRect({
                    x: navRect.left - headerRect.left,
                    y: navRect.top - headerRect.top,
                    width: navRect.width,
                    height: navRect.height,
                  });
                }
              }
            }
            break;
          }
        }
      }
    };

    // Listen to Lenis scroll events
    lenis.on("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => lenis.off("scroll", handleScroll);
  }, [lenis, isScrollMode]);

  // Generate CSS mask to create hole for active nav item
  const generateMask = () => {
    if (!isScrollMode || !activeNavRect) {
      return "none";
    }

    // Create a mask that covers everything EXCEPT the active nav area
    const { x, y, width, height } = activeNavRect;
    return `
      polygon(
        0% 0%, 
        0% 100%, 
        ${x}px 100%, 
        ${x}px ${y}px, 
        ${x + width}px ${y}px, 
        ${x + width}px ${y + height}px, 
        ${x}px ${y + height}px, 
        ${x}px 100%, 
        100% 100%, 
        100% 0%
      )
    `;
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[65vw]">
      {/* Background with blur and mask to create hole */}
      <div
        className="absolute inset-0 backdrop-blur-md border border-[var(--color-primary)]"
        style={{
          backgroundColor: "rgb(from var(--background) r g b / 0.05)",
          clipPath: generateMask(),
          WebkitClipPath: generateMask(),
        }}
      />

      {/* Content layer - no blur, just positioning */}
      <div className="relative flex items-center justify-between px-6 py-4">
        <Link href="/">
          <h1 className="text font-bold hover:text-[var(--color-primary)] transition-colors cursor-pointer">
            newport
            <br /> engineering
          </h1>
        </Link>
        <nav className="flex gap-6 overflow-x-auto" id="navbar-list">
          {pagesConfig.map((page) => (
            <Link
              key={page.id}
              href={isScrollMode ? page.anchor : page.route}
              className={`font-bold transition-colors whitespace-nowrap px-3 py-2 relative ${
                isScrollMode && activeSection === page.id
                  ? " border-1 border-[var(--color-primary)]"
                  : "hover:text-[var(--color-primary)] rounded-md"
              }`}
              data-section={page.id}
              onClick={isScrollMode ? handleSmoothScroll : undefined}
            >
              {page.displayName}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Header;
