"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider(props: SmoothScrollProviderProps) {
  const { children } = props;

  useEffect(() => {
    let lenisInstance: import("lenis").default | null = null;
    let tickerCallback: ((time: number) => void) | null = null;

    async function initLenis() {
      const { default: Lenis } = await import("lenis");
      lenisInstance = new Lenis({
        duration: 1.6,
        smoothWheel: true,
      });

      lenisInstance.on("scroll", ScrollTrigger.update);

      tickerCallback = (time: number) => {
        lenisInstance?.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    }

    void initLenis();

    return () => {
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
      }
      lenisInstance?.destroy();
    };
  }, []);

  return <>{children}</>;
}
