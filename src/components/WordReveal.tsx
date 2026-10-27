"use client";

import { motion } from "framer-motion";

export interface WordRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  trigger?: "mount" | "inView";
  blurPx?: number;
  duration?: number;
  startDelay?: number;
  staggerDelay?: number;
  color?: string;
}

export function WordReveal(props: WordRevealProps) {
  const {
    text,
    as = "h2",
    className = "",
    trigger = "inView",
    blurPx = 6,
    duration = 0.85,
    startDelay = 0.02,
    staggerDelay = 0.03,
    color,
  } = props;

  const Tag = as;
  const words = text.split(" ");
  const effectiveBlur = Math.min(blurPx, 5);
  const effectiveDuration = Math.min(duration, 0.95);

  return (
    <Tag className={className} style={color ? { color } : undefined}>
      {words.map((word, index) => {
        const delay = startDelay + index * Math.min(staggerDelay, 0.04);
        const initial = {
          opacity: 0.001,
          y: 8,
          filter: `blur(${effectiveBlur}px)`,
        };
        const target = {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        };
        const transition = {
          duration: effectiveDuration,
          delay,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        };

        return (
          <motion.span
            key={`${word}-${index}`}
            initial={initial}
            animate={trigger === "mount" ? target : undefined}
            whileInView={trigger === "inView" ? target : undefined}
            viewport={
              trigger === "inView" ? { once: true, amount: 0.15 } : undefined
            }
            transition={transition}
            style={{
              display: "inline-block",
              marginRight: index < words.length - 1 ? "0.26em" : 0,
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </Tag>
  );
}
