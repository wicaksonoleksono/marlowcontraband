"use client";
///app/components/sections/HomeSection.tsx
import React from "react";
import StreamingTextOnLock from "@/app/utils/StreamingTextOnLock";
import Button from "../components/ui/Button";
import { useLenis } from "@/app/hooks/LenisContext";
const HomeSection = () => {
  const lenis = useLenis();

  return (
    // 1. The <section> is now a grid container with 3 equal rows
    <section
      id="home"
      data-section="home"
      className="min-h-screen grid grid-rows-4 mt-6 alig"
    >
      <div className="flex flex-col ">
        <h1 className="text-9xl mt-24 font-bold ">Humankind</h1>
      </div>
      <div className="flex flex-col items-top text-justify  pr-8 text-sm  backdrop-blur-md p-2">
        <p className="text-[var(--color-text-light)] max-w-4xl  backdrop-blur-md my-3 text-2xl">
          Multidisciplinary research and development lab, where we turn
          child-like curiosity into products you can use with seamless
          integration
        </p>

        <div className="flex flex-row gap-4 items-start justify-start mt-2">
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
