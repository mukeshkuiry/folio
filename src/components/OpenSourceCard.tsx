"use client";

import type { OpenSourceContribution } from "@/types/portfolio.interfaces";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface OpenSourceCardProps {
  item: OpenSourceContribution;
}

export function OpenSourceCard(props: OpenSourceCardProps) {
  const { item } = props;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Exact Framer transition1 from bnnFJdSAG.js: { bounce: 0.2, delay: 0, duration: 1.6, type: "spring" }
  const flipTransition = {
    type: "spring" as const,
    bounce: 0.2,
    delay: 0,
    duration: 1.6,
  };

  return (
    <div ref={cardRef} className="majd-flip-card">
      {/* Front Face (Quote + Author — rotates from -180deg to 0deg when visible) */}
      <motion.a
        href={item.prUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="majd-flip-face majd-flip-front-layer"
        initial={{ rotateY: -180, transformPerspective: 1200 }}
        animate={{
          rotateY: isVisible ? 0 : -180,
          transformPerspective: 1200,
        }}
        transition={flipTransition}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            <span
              className="majd-p-light"
              style={{
                color: "rgba(250, 247, 243, 0.6)",
                fontSize: "13px",
              }}
            >
              {item.org}
            </span>
            <span
              style={{
                padding: "3px 9px",
                borderRadius: "999px",
                backgroundColor: "rgba(250, 247, 243, 0.1)",
                color: "#faf7f3",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              {item.prNumber} ↗
            </span>
          </div>

          <p
            className="majd-p-small"
            style={{
              color: "#faf7f3",
              lineHeight: "1.48em",
            }}
          >
            {item.quote}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            width: "100%",
            paddingTop: "12px",
            borderTop: "1px solid rgba(250, 247, 243, 0.1)",
          }}
        >
          {/* 46x46 circular badge */}
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 226,
              overflow: "hidden",
              flexShrink: 0,
              backgroundColor: "#faf7f3",
              color: "#111111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "15px",
              letterSpacing: "-0.03em",
            }}
          >
            {item.logoText}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
              minWidth: 0,
            }}
          >
            <span
              className="majd-p-small"
              style={{
                color: "#faf7f3",
                fontWeight: 600,
              }}
            >
              {item.project}
            </span>
            <p
              className="majd-p-light"
              style={{
                color: "rgba(250, 247, 243, 0.65)",
                fontSize: "14px",
              }}
            >
              {item.role}
            </p>
          </div>
        </div>
      </motion.a>

      {/* Back Face (Centered 60x60 Logo — rotates from 0deg to 180deg when visible) */}
      <motion.div
        className="majd-flip-face majd-flip-back-layer"
        initial={{ rotateY: 0, transformPerspective: 1200 }}
        animate={{
          rotateY: isVisible ? 180 : 0,
          transformPerspective: 1200,
        }}
        transition={flipTransition}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.logoSrc}
          alt=""
          style={{
            width: 60,
            height: 60,
            objectFit: "contain",
            display: "block",
          }}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}
