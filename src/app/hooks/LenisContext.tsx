"use client";
// LenisContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Lenis from "lenis";

// The context type definition is correct
const LenisContext = createContext<Lenis | null>(null);

export const LenisProvider = ({ children }: { children: ReactNode }) => {
  // 1. Store the Lenis instance in STATE, not a ref.
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const instance = new Lenis();

    // 2. Update the state once the instance is created
    setLenis(instance);

    // Animation frame loop
    const raf = (time: number) => {
      instance.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    // 3. Provide the state variable as the value
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
};

export const useLenis = () => {
  return useContext(LenisContext);
};
