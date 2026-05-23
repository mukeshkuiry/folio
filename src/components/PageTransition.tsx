"use client";
import { useRef } from "react";

// Exported ref so other components can trigger transitions
export const transitionRef = { overlay: null as HTMLDivElement | null };

export function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Store ref globally for programmatic use
  if (overlayRef.current) {
    transitionRef.overlay = overlayRef.current;
  }

  return <div className="page-transition-overlay" ref={overlayRef} />;
}
