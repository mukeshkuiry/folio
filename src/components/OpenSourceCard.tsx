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
      <motion.div
        className="majd-flip-face majd-flip-front-layer"
        initial={{ rotateY: -180, transformPerspective: 1200 }}
        animate={{
          rotateY: isVisible ? 0 : -180,
          transformPerspective: 1200,
        }}
        transition={flipTransition}
      >
        <p className="majd-p-body" style={{ color: "#faf7f3" }}>
          {item.quote}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            width: "100%",
          }}
        >
          {/* 50x50 circular avatar (border-radius: 226px in bnnFJdSAG.js) */}
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 226,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.avatarSrc}
              alt={item.project}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              loading="lazy"
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              minWidth: 0,
            }}
          >
            <a
              href={item.prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="majd-p-small"
              style={{
                color: "#faf7f3",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.project} · {item.prNumber}
            </a>
            <p className="majd-p-light" style={{ color: "#faf7f3" }}>
              {item.role}
            </p>
          </div>
        </div>
      </motion.div>

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
