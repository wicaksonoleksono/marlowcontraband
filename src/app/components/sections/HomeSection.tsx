"use client";
///app/components/sections/HomeSection.tsx
import React from "react";
import StreamingTextOnLock from "../animate/StreamingTextOnLock";
import KeyValueDisplay from "../common/KeyValueDisplay";
import scopesData from "../../data/scopes.json";
import Button from "../ui/Button";
import { useLenis } from "@/app/context/LenisContext";
const HomeSection = () => {
  const lenis = useLenis();

  return (
    // 1. The <section> is now a grid container with 3 equal rows
    <section
      id="home"
      data-section="home"
      className="min-h-screen grid grid-rows-4 mt-6"
    >
      <div className="flex flex-col items-start">
        <h1 className="text-7xl font-bold">newport engineering</h1>
        <p className="text-[var(--color-text-light)] max-w-4xl  backdrop-blur-md py-6 text-3xl">
          newport engineering. we automate, we build and it's not a buzzword.
        </p>
      </div>
      <div className="flex flex-row gap-4 items-start justify-start ">
        <Button
          variant="outline"
          size="lg"
          onClick={() => {
            if (lenis) {
              lenis.scrollTo("#projects");
            }
          }}
        >
          Learn More
        </Button>
        <Button
          variant="primary"
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
      <div className="flex flex-col items-top text-justify border-r-4 border-[var(--color-primary)] pr-8 text-sm  backdrop-blur-md p-2">
        <p className="text-xl">$whoarewe</p>
        <StreamingTextOnLock
          text={`
            We build systems where automation and pattern recognition work together. Discrete recognition sets the rules and the structure. Continuous and probabilistic recognition brings adaptation and learning.
            Our approach to automation and web development follows this path. The tools we create are not static. They evolve, they handle uncertainty, and they simplify complexity.
            Newport Engineering is about delivering infrastructure and interfaces that scale quietly in the background so people and teams can move faster in the foreground.
            `}
          mode="char"
        />
      </div>
      <div className="flex items-start"></div>
    </section>
  );
};

export default HomeSection;
