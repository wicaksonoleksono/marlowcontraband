"use client";
///app/components/sections/HomeSection.tsx
import React from "react";
import Button from "../components/ui/Button";
import { useLenis } from "@/app/hooks/LenisContext";
import BrushBlur from "../components/ui/AnimatedBlurContainer";
const HomeSection = () => {
  const lenis = useLenis();

  return (
    // 1. The <section> is now a grid container with 3 equal rows
    <section
      id="home"
      data-section="home"
      className="min-h-screen grid grid-rows-2 mt-6"
    >
      {/* Desktop: BrushBlur enabled */}
      <BrushBlur
        className="hidden md:flex flex-col items-top text-justify pr-8 text-sm p-2"
        radiusPx={300}
      >
        <h1 className="text-5xl md:text-7xl lg:text-9xl mt-12 md:mt-24 font-bold">mantera<br />studio</h1>
        <p className="text-[var(--color-text-light)] max-w-4xl my-3 text-lg md:text-xl lg:text-2xl">
          Multidisciplinary research and development lab, where we turn
          <strong> child-like curiosity</strong> into <strong>reality</strong>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start justify-start mt-2">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              if (lenis) {
                lenis.scrollTo("#products");
              }
            }}
          >
            See our work
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              if (lenis) {
                lenis.scrollTo("#contact");
              }
            }}
          >
            Contact Us
          </Button>
        </div>
      </BrushBlur>

      {/* Mobile: No BrushBlur */}
      <div className="md:hidden flex flex-col items-top text-justify p-4">
        <h1 className="text-4xl sm:text-5xl mt-12 font-bold">mantera<br />studio</h1>
        <p className="text-[var(--color-text-light)] my-3 text-base sm:text-lg">
          Multidisciplinary research and development lab, where we turn
          <strong> child-like curiosity</strong> into <strong>reality</strong>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start justify-start mt-2">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              if (lenis) {
                lenis.scrollTo("#products");
              }
            }}
          >
            See our work
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              if (lenis) {
                lenis.scrollTo("#contact");
              }
            }}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
