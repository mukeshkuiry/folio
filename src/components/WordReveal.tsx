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
    blurPx = 10,
    duration = 1.8,
    startDelay = 0.05,
    staggerDelay = 0.05,
    color,
  } = props;

  const Tag = as;
  const words = text.split(" ");

  return (
    <Tag className={className} style={color ? { color } : undefined}>
      {words.map((word, index) => {
        const delay = startDelay + index * staggerDelay;
        const initial = {
          opacity: 0.001,
          y: 10,
          filter: `blur(${blurPx}px)`,
        };
        const target = {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        };
        const transition = {
          type: "spring" as const,
          bounce: 0,
          duration,
          delay,
        };

        return (
          <motion.span
            key={`${word}-${index}`}
            initial={initial}
            animate={trigger === "mount" ? target : undefined}
            whileInView={trigger === "inView" ? target : undefined}
            viewport={
              trigger === "inView" ? { once: true, amount: 0.2 } : undefined
            }
            transition={transition}
            style={{
              display: "inline-block",
              willChange: "transform, opacity, filter",
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
