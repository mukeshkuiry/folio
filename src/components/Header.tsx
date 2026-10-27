"use client";

import { RollingText } from "@/components/RollingText";
import { PROFILE } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavLinkItem {
  label: string;
  href: string;
  delayMs: number;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: "About Me", href: "/#bio-section", delayMs: 60 },
  { label: "Services", href: "/#services", delayMs: 120 },
  { label: "Experience", href: "/#experience", delayMs: 180 },
  { label: "Projects", href: "/work#hero-section", delayMs: 240 },
  { label: "Blog", href: "/blog#hero-section", delayMs: 300 },
  { label: "Contact", href: "/#contact", delayMs: 360 },
];

export function Header() {
  const pathname = usePathname();
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const isOpen = openOnPath === pathname;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenOnPath(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleMenu = () => {
    setOpenOnPath((prev) => (prev === pathname ? null : pathname));
  };

  const closeMenu = () => {
    setOpenOnPath(null);
  };

  return (
    <>
      <div className="majd-navbar-wrap">
        <nav
          className={`majd-navbar${isOpen ? " is-open" : ""}`}
          aria-label="Primary Navigation"
        >
          <div className="majd-navbar-inner">
            <div className="majd-navbar-top">
              <Link
                href="/#hero-section"
                className="majd-navbar-logo"
                onClick={closeMenu}
              >
                {PROFILE.shortName}
              </Link>
              <button
                type="button"
                className={`majd-hamburger${isOpen ? " is-open" : ""}`}
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                <span className="majd-hamburger-dot" />
                <span className="majd-hamburger-dot" />
                <span className="majd-hamburger-dot" />
              </button>
            </div>

            {isOpen && (
              <div className="majd-navbar-dropdown">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="majd-nav-pill"
                    onClick={closeMenu}
                    style={{
                      animation: `majd-slide-link 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${item.delayMs}ms both`,
                    }}
                  >
                    <RollingText
                      text={item.label}
                      color="#111111"
                      padding="8px 16px"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Floating Bottom-Right Action Pills (Replicating Main template d_uHRxjHw.js) */}
      <div className="majd-floating-ctas">
        <a
          href={PROFILE.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="majd-floating-cta"
        >
          <RollingText
            text="GitHub Profile"
            color="#faf7f3"
            padding="8px 16px"
          />
        </a>
        <Link href="/work#hero-section" className="majd-floating-cta">
          <RollingText
            text="All Projects"
            color="#faf7f3"
            padding="8px 16px"
          />
        </Link>
      </div>
    </>
  );
}
