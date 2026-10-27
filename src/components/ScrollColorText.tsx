"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      end: "top 15%",
      scrub: 0.3,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const words = text.split(" ");
  const total = words.length;
  const filledWords = Math.floor(scrollProgress * total);

  return (
    <div ref={containerRef} className="majd-p-quote">
      {words.map((word, index) => {
        const isFilled = index <= filledWords;
        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              color: isFilled ? fillColor : startColor,
              transition: "color 0.3s linear",
              willChange: "color",
              marginRight: "0.25em",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
