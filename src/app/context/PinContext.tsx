// app/context/PinContext.tsx
"use client";

import { createContext, useContext } from "react";

// The context will provide the scroll progress within the pinned section.
const PinContext = createContext<{ progress: number }>({ progress: 0 });

// A custom hook to easily access the progress.
export const usePinProgress = () => {
  return useContext(PinContext);
};

export default PinContext;
