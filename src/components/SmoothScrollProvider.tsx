"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lenis: import("lenis").default | null = null;

    async function init() {
      const { default: Lenis } = await import("lenis");
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time: number) => {
        lenis?.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    init();

    return () => {
      lenis?.destroy();
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
