"use client";
import { useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

export function useScramble(originalText: string) {
  const animate = useCallback(
    (el: HTMLElement) => {
      const chars = CHARS;
      let frame = 0;
      const totalFrames = 16;
      let rafId: number;

      const tick = () => {
        const progress = frame / totalFrames;
        const result = originalText
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i / originalText.length < progress) return originalText[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        el.textContent = result;
        frame++;

        if (frame <= totalFrames) {
          rafId = requestAnimationFrame(tick);
        } else {
          el.textContent = originalText;
        }
      };

      rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafId);
    },
    [originalText],
  );

  return animate;
}
