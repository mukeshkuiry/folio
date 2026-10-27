"use client";

import type { CSSProperties } from "react";

export interface RollingTextProps {
  text: string;
  padding?: string;
  color?: string;
  fontSize?: string;
  stagger?: number;
  duration?: number;
  reverse?: boolean;
}

export function RollingText(props: RollingTextProps) {
  const {
    text,
    padding = "8px 16px",
    color,
    fontSize = "16px",
    stagger = 35,
    duration = 0.45,
    reverse = false,
  } = props;

  const numericSize = parseInt(fontSize, 10) || 16;
  const lineHeightAbs = `${(numericSize * 1.2).toFixed(1)}px`;
  const chars = Array.from(text);
  const total = chars.length;

  const innerStyle: CSSProperties = {
    color: color ?? "inherit",
    fontSize,
    "--line-height-abs": lineHeightAbs,
  } as CSSProperties;

  return (
    <span className="majd-rolling-wrap" style={{ padding }}>
      <span className="majd-rolling-inner" style={innerStyle}>
        {chars.map((char, index) => {
          const orderIndex = reverse ? total - 1 - index : index;
          const delayMs =
            total > 0
              ? Math.round(((duration * 1000) / total) * orderIndex * (stagger / 100))
              : 0;
          const charStyle: CSSProperties = {
            "--char-delay": `${delayMs}ms`,
          } as CSSProperties;

          return (
            <span key={index} className="majd-rolling-char" style={charStyle}>
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
