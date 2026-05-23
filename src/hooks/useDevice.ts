"use client";
import { useState, useEffect } from "react";

/**
 * Returns "m" for mobile/tablet or "d" for desktop.
 * Matches the device detection from the Zajno spec §12.1.
 */
export function useDevice(): "m" | "d" {
  const [device, setDevice] = useState<"m" | "d">("d");

  useEffect(() => {
    const check = () => {
      const isMobile =
        /Mobi|Android|Tablet|iPad|iPhone/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ||
        window.innerWidth <= 1024;
      setDevice(isMobile ? "m" : "d");
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return device;
}
