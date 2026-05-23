"use client";
import { useEffect, useRef } from "react";
import { useDevice } from "@/hooks/useDevice";

export function CustomCursor() {
  const device = useDevice();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (device === "m") return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseEnterLink = () => ring.classList.add("is-hover");
    const onMouseLeaveLink = () => ring.classList.remove("is-hover");

    document.addEventListener("mousemove", onMouseMove);

    // Attach hover to all interactive elements
    const addHoverListeners = () => {
      const targets = document.querySelectorAll("a, button, [data-cursor-hover]");
      targets.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterLink);
        el.addEventListener("mouseleave", onMouseLeaveLink);
      });
    };
    addHoverListeners();

    // Observe DOM changes for dynamically added elements
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    function isDarkUnderCursor(x: number, y: number): boolean {
      try {
        const els = document.elementsFromPoint(x, y);
        return els.some(
          (el) =>
            el instanceof HTMLElement &&
            (el.dataset.theme === "dark" ||
              el.closest("[data-theme='dark']") !== null)
        );
      } catch {
        return false;
      }
    }

    function animate() {
      if (!dot || !ring) return;
      // Dot: snaps directly
      dotX = mouseX;
      dotY = mouseY;
      dot.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;

      // Ring: lags behind (lerp)
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate3d(${ringX - 24}px, ${ringY - 24}px, 0)`;

      // Dark/light adaptive color
      const dark = isDarkUnderCursor(mouseX, mouseY);
      dot.classList.toggle("is-dark", dark);
      ring.classList.toggle("is-dark", dark);

      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, [device]);

  if (device === "m") return null;

  return (
    <>
      <div className="cursor" ref={dotRef}>
        <div className="cursor-dot" />
      </div>
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
