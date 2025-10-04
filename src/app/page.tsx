"use client";

import React from "react";
import HomeSection from "./pages/HomeSection";
import AboutSection from "./pages/AboutSection";
import ProductsSection from "./pages/ProductsSection";
import ResearchSection from "./pages/ResearchSection";
import ContactSection from "./pages/ContactSection";
import Header from "./components/layout/Header";
import Footer from "./components/layout/footer";
import { Analytics } from "@vercel/analytics/next";
import { LenisProvider } from "./hooks/LenisContext";
// import ThreeBackground from "./components/ThreeBackground";
import EdgeRootCanvas from "./components/ThreeBackground";
export default function RootPage() {
  // We no longer need the useLenis hook here
  // The provider will handle the instance creation

  return (
    // Wrap everything in the LenisProvider
    <LenisProvider>
      <div>
        <EdgeRootCanvas />
        <Header isScrollMode={true} />
        <div className="mx-auto pt-20" style={{ width: "var(--layout-width)" }}>
          <div className="flex flex-col justify-between px-6 py-4 w-full">
            <HomeSection />
            <AboutSection />
            <ProductsSection />
            <ResearchSection />
            <ContactSection />
          </div>
        </div>
        <Analytics />
        <Footer />
      </div>
    </LenisProvider>
  );
}
