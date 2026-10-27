"use client";

import { type ReactNode, useEffect } from "react";

export interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider(props: SmoothScrollProviderProps) {
  const { children } = props;

  useEffect(() => {
    let lenisInstance: import("lenis").default | null = null;
    let rafId = 0;

    async function initLenis() {
      const { default: Lenis } = await import("lenis");
      lenisInstance = new Lenis({
        duration: 1.1,
        lerp: 0.11,
        smoothWheel: true,
        syncTouch: false,
      });

      const raf = (time: number) => {
        if (lenisInstance) {
          lenisInstance.raf(time);
          rafId = requestAnimationFrame(raf);
        }
      };

      rafId = requestAnimationFrame(raf);
    }

    void initLenis();

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor || !lenisInstance) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href.includes("#")) return;

      const [pathPart, hashPart] = href.split("#");
      const isCurrentPage =
        !pathPart || pathPart === "/" || pathPart === window.location.pathname;

      if (isCurrentPage && hashPart) {
        const targetEl = document.getElementById(hashPart);
        if (targetEl) {
          event.preventDefault();
          lenisInstance.scrollTo(targetEl, { offset: 0 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      lenisInstance?.destroy();
    };
  }, []);

  return <>{children}</>;
}
