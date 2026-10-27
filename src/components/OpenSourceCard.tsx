"use client";

import type { OpenSourceContribution } from "@/types/portfolio.interfaces";
import { useEffect, useRef, useState } from "react";

export interface OpenSourceCardProps {
  item: OpenSourceContribution;
}

export function OpenSourceCard(props: OpenSourceCardProps) {
  const { item } = props;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsFlipped(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.45 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`majd-flip-card${isFlipped ? " is-flipped" : ""}`}
    >
      <div className="majd-flip-card-inner">
        {/* Back Face (Initial obscured state with centered Logo — bnnFJdSAG.js NQ4gmArur) */}
        <div className="majd-flip-face majd-flip-back">
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              backgroundColor: "rgba(250, 247, 243, 0.1)",
              border: `1.5px solid ${item.accentColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-archivo)",
              fontWeight: 800,
              fontSize: 22,
              color: item.accentColor,
            }}
          >
            {item.logoText}
          </div>
          <span className="majd-p-small" style={{ color: "rgba(250, 247, 243, 0.6)" }}>
            {item.project}
          </span>
        </div>

        {/* Front Face (Revealed on 180deg flip — bnnFJdSAG.js LxTYbZf1i) */}
        <div className="majd-flip-face majd-flip-front">
          <p className="majd-p-body" style={{ color: "#faf7f3" }}>
            {item.quote}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 226,
                  backgroundColor: "rgba(250, 247, 243, 0.08)",
                  border: `1.5px solid ${item.accentColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-archivo)",
                  fontWeight: 700,
                  fontSize: 16,
                  color: item.accentColor,
                  flexShrink: 0,
                }}
              >
                {item.logoText}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                <a
                  href={item.prUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="majd-p-small"
                  style={{
                    color: "#faf7f3",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  {item.project} ({item.prNumber})
                </a>
                <p
                  className="majd-p-light"
                  style={{ color: "rgba(250, 247, 243, 0.75)" }}
                >
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
