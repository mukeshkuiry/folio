"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

export interface ScrollColorTextProps {
  text: string;
  startColor?: string;
  fillColor?: string;
}

export function ScrollColorText(props: ScrollColorTextProps) {
  const {
    text,
    startColor = "rgba(0, 0, 0, 0.1)",
    fillColor = "#111111",
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lastFilledRef = useRef<number>(-1);

  const words = text.split(" ");
  const total = words.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "start 15%"],
  });

  const updateWordColors = (progress: number) => {
    const exactIndex = progress * total;

    for (let i = 0; i < total; i++) {
      const span = wordRefs.current[i];
      if (!span) continue;

      const delta = exactIndex - i;
      const ratio = Math.min(Math.max(delta / 1.8, 0), 1);
      const opacity = 0.12 + ratio * 0.88;
      span.style.opacity = opacity.toFixed(3);
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    updateWordColors(latest);
  });

  useEffect(() => {
    updateWordColors(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="majd-p-quote">
      {words.map((word, index) => (
        <span
          key={index}
          ref={(el) => {
            wordRefs.current[index] = el;
          }}
          style={{
            display: "inline-block",
            color: fillColor,
            opacity: index === 0 ? 1 : 0.12,
            transition: "opacity 0.14s linear",
            marginRight: "0.25em",
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
