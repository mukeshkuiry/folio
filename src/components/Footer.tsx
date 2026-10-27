"use client";

import { RollingText } from "@/components/RollingText";
import { WordReveal } from "@/components/WordReveal";
import { PROFILE } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Home", href: "/#hero-section", delay: 0.1 },
  { label: "About Me", href: "/#bio-section", delay: 0.15 },
  { label: "Experience", href: "/#experience", delay: 0.2 },
  { label: "Works", href: "/work#hero-section", delay: 0.25 },
  { label: "Open Source", href: "/#open-source", delay: 0.3 },
  { label: "Blog", href: "/blog#hero-section", delay: 0.35 },
  { label: "Contact", href: "/#contact", delay: 0.4 },
];

export function Footer() {
  return (
    <footer className="majd-footer" data-theme="dark">
      <div className="majd-footer-container">
        <div style={{ maxWidth: "400px" }}>
          <WordReveal
            text="Engineering Systems for Scale."
            as="h2"
            className="majd-h2-display"
            color="#faf7f3"
            trigger="inView"
            blurPx={10}
            duration={1.8}
          />
        </div>

        <div className="majd-footer-columns">
          <div className="majd-footer-col">
            <WordReveal
              text="/Quick links"
              as="h4"
              className="majd-h4-col"
              color="#faf7f3"
              trigger="inView"
              blurPx={10}
              duration={1.8}
            />
            <div className="majd-footer-links-wrap">
              {FOOTER_LINKS.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    type: "spring",
                    bounce: 0,
                    duration: 1.2,
                    delay: item.delay,
                  }}
                >
                  <Link href={item.href} className="majd-nav-pill">
                    <RollingText
                      text={item.label}
                      color="#111111"
                      padding="8px 16px"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="majd-footer-col">
            <WordReveal
              text="/Contact"
              as="h4"
              className="majd-h4-col"
              color="#faf7f3"
              trigger="inView"
              blurPx={10}
              duration={1.8}
            />
            <motion.div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                type: "spring",
                bounce: 0,
                duration: 1.2,
                delay: 0.2,
              }}
            >
              <a
                href={`mailto:${PROFILE.email}`}
                className="majd-p-body"
                style={{
                  color: "#faf7f3",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                {PROFILE.email}
              </a>
              <p
                className="majd-p-small"
                style={{ color: "rgba(250, 247, 243, 0.5)" }}
              >
                {PROFILE.location} · {PROFILE.yearBadge} {PROFILE.name}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Giant Watermark — in normal flex flow so Framer transform never breaks centering */}
      <motion.div
        className="majd-footer-watermark"
        aria-hidden="true"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          type: "spring",
          bounce: 0,
          duration: 1.4,
        }}
      >
        <svg
          viewBox="0 0 1180 230"
          width="100%"
          height="auto"
          style={{ display: "block", overflow: "visible" }}
        >
          <text
            x="590"
            y="208"
            textAnchor="middle"
            textLength="1170"
            lengthAdjust="spacing"
            fill="rgba(250, 247, 243, 0.1)"
            fontFamily="var(--font-archivo)"
            fontWeight="700"
            fontSize="248"
          >
            MUKESH
          </text>
        </svg>
      </motion.div>
    </footer>
  );
}
