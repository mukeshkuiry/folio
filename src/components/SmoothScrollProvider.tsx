"use client";

import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";

export interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider(props: SmoothScrollProviderProps) {
  const { children } = props;
  const pathname = usePathname();
  const lenisRef = useRef<import("lenis").default | null>(null);

  useEffect(() => {
    let rafId = 0;
    let isCancelled = false;

    async function initLenis() {
      const { default: Lenis } = await import("lenis");
      if (isCancelled) return;

      const instance = new Lenis({
        lerp: 0.095,
        wheelMultiplier: 0.95,
        smoothWheel: true,
        syncTouch: false,
      });
      lenisRef.current = instance;

      const raf = (time: number) => {
        if (!isCancelled && lenisRef.current) {
          lenisRef.current.raf(time);
          rafId = requestAnimationFrame(raf);
        }
      };

      rafId = requestAnimationFrame(raf);
    }

    void initLenis();

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (!href.includes("#")) return;

      const [pathPart, hashPart] = href.split("#");
      const targetPath = pathPart || window.location.pathname;
      const isCurrentPage = targetPath === window.location.pathname;

      if (isCurrentPage && hashPart) {
        const targetEl = document.getElementById(hashPart);
        if (targetEl) {
          event.preventDefault();
          const offset = hashPart === "hero-section" ? 0 : -92;
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetEl, {
              offset,
              duration: 1.05,
            });
          } else {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
          window.history.pushState(null, "", href);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      isCancelled = true;
      document.removeEventListener("click", handleAnchorClick);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    const timer = window.setTimeout(() => {
      if (hash) {
        const targetEl = document.getElementById(hash);
        if (targetEl) {
          const offset = hash === "hero-section" ? 0 : -92;
          if (lenisRef.current) {
            lenisRef.current.scrollTo(targetEl, { offset, duration: 0.9 });
          } else {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }
      }
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    }, 40);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
