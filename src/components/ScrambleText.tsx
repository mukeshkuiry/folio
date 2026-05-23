"use client";
import { useRef, ReactNode } from "react";
import { useScramble } from "@/hooks/useScramble";

interface ScrambleTextProps {
  text: string;
  className?: string;
  children?: ReactNode;
}

export function ScrambleText({ text, className }: ScrambleTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const scramble = useScramble(text);

  const handleMouseEnter = () => {
    if (spanRef.current) scramble(spanRef.current);
  };

  return (
    <span
      ref={spanRef}
      className={className}
      onMouseEnter={handleMouseEnter}
    >
      {text}
    </span>
  );
}
