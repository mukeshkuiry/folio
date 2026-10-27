"use client";

import { RollingText } from "@/components/RollingText";
import { WordReveal } from "@/components/WordReveal";
import { PROFILE, SOCIALS } from "@/lib/data";
import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Home", href: "/#hero-section" },
  { label: "About Me", href: "/#bio-section" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/work#hero-section" },
  { label: "Open Source", href: "/#open-source" },
  { label: "Blog", href: "/blog#hero-section" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="majd-footer" data-theme="dark">
      <div className="majd-footer-shell">
        {/* Top 4-Column Architectural Grid */}
        <div className="majd-footer-container">
          <div className="majd-footer-brand-col">
            <span className="majd-footer-eyebrow">
              {PROFILE.name.toUpperCase()} — {PROFILE.role}
            </span>
            <WordReveal
              text="Engineering Systems for Scale."
              as="h2"
              className="majd-h2-display majd-footer-headline"
              color="#faf7f3"
              trigger="inView"
              blurPx={6}
              duration={0.9}
            />
            <p className="majd-footer-bio">
              Building high-throughput FinTech payment engines, distributed
              Golang &amp; TypeScript microservices, and native macOS developer
              tools.
            </p>
            <div className="majd-footer-status-badge">
              <span className="majd-footer-status-dot" aria-hidden="true" />
              <span>Based in {PROFILE.location} · Available for select roles</span>
            </div>
          </div>

          <div className="majd-footer-columns">
            <div className="majd-footer-col">
              <h4 className="majd-h4-col">/Navigation</h4>
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
                      padding="8px 14px"
                    />
                  </Link>
                ))}
              </div>
            </div>

            <div className="majd-footer-col">
              <h4 className="majd-h4-col">/Profiles</h4>
              <ul className="majd-footer-social-list">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="majd-footer-ext-link"
                    >
                      <span>{social.label}</span>
                      <span className="majd-footer-ext-handle">
                        @{social.handle} ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="majd-footer-col">
              <h4 className="majd-h4-col">/Direct</h4>
              <div className="majd-footer-direct-box">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="majd-footer-email-link"
                >
                  {PROFILE.email}
                </a>
                <p className="majd-footer-meta-text">{PROFILE.education}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Unclipped Full-Width Watermark in Flow */}
        <div className="majd-footer-watermark" aria-hidden="true">
          <svg
            viewBox="0 0 1200 225"
            width="100%"
            height="auto"
            style={{ display: "block", overflow: "visible" }}
          >
            <text
              x="600"
              y="198"
              textAnchor="middle"
              fill="rgba(250, 247, 243, 0.085)"
              fontFamily="var(--font-archivo)"
              fontWeight="800"
              fontSize="246"
              letterSpacing="-0.03em"
            >
              MUKESH
            </text>
          </svg>
        </div>

        {/* Bottom Bar */}
        <div className="majd-footer-bottom-bar">
          <p className="majd-footer-copyright">
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="majd-footer-top-btn"
          >
            <span>Back to top</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
