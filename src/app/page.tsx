"use client";

import React from "react";
import HomeSection from "./components/sections/HomeSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ResearchSection from "./components/sections/ResearchSection";
import Header from "./components/presist/Header";
import Footer from "./components/presist/footer";
import { LenisProvider } from "./context/LenisContext";
import ThreeBackground from "./components/ThreeBackground";
export default function RootPage() {
  // We no longer need the useLenis hook here
  // The provider will handle the instance creation

  return (
    // Wrap everything in the LenisProvider
    <LenisProvider>
      <div>
        <ThreeBackground />
        <Header isScrollMode={true} />
        {/* scrollTo logic will be handled differently or removed */}
        <div className="w-[65vw] mx-auto pt-20 ">
          <div className="flex flex-col justify-between px-6 py-4 w-full">
            {/* No need to pass lenis as a prop anymore! */}
            <HomeSection />
            <ProjectsSection />
            <ResearchSection />
          </div>
        </div>
        <Footer />
      </div>
    </LenisProvider>
  );
}
