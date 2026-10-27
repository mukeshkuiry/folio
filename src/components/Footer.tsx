"use client";

import { RollingText } from "@/components/RollingText";
import { PROFILE } from "@/lib/data";
import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Home", href: "/#hero-section" },
  { label: "About Me", href: "/#bio-section" },
  { label: "Services", href: "/#services" },
  { label: "Experience", href: "/#experience" },
  { label: "Works", href: "/work#hero-section" },
  { label: "Blog", href: "/blog#hero-section" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  return (
    <footer className="majd-footer" data-theme="dark">
      <div className="majd-footer-container">
        <h2
          className="majd-h2-display"
          style={{ color: "#faf7f3", maxWidth: "360px" }}
        >
          Scaling
          <br />
          Systems for Growth.
        </h2>

        <div className="majd-footer-columns">
          <div className="majd-footer-col">
            <h4 className="majd-h4-col">/Quick links</h4>
            <div className="majd-footer-links-wrap">
              {FOOTER_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="majd-nav-pill"
                >
                  <RollingText
                    text={item.label}
                    color="#111111"
                    padding="8px 16px"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="majd-footer-col">
            <h4 className="majd-h4-col">/Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
                {PROFILE.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Watermark (Replicating .framer-3vb2n7 viewBox="0 0 1200 375") */}
      <div className="majd-footer-watermark" aria-hidden="true">
        <svg
          viewBox="0 0 1200 300"
          width="100%"
          height="auto"
          style={{ display: "block", overflow: "visible" }}
        >
          <text
            x="50%"
            y="245"
            textAnchor="middle"
            fill="rgba(250, 247, 243, 0.1)"
            fontFamily="var(--font-archivo)"
            fontWeight="700"
            fontSize="268"
            letterSpacing="-0.02em"
          >
            MUKESH
          </text>
        </svg>
      </div>
    </footer>
  );
}
