"use client";

import { RollingText } from "@/components/RollingText";
import { PROFILE } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface NavLinkItem {
  label: string;
  href: string;
  delaySec: number;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: "About Me", href: "/#bio-section", delaySec: 0.03 },
  { label: "Experience", href: "/#experience", delaySec: 0.06 },
  { label: "Projects", href: "/#projects", delaySec: 0.09 },
  { label: "Open Source", href: "/#open-source", delaySec: 0.12 },
  { label: "Blog", href: "/blog#hero-section", delaySec: 0.15 },
  { label: "Contact", href: "/#contact", delaySec: 0.18 },
];

export function Header() {
  const pathname = usePathname();
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const isOpen = openOnPath === pathname;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenOnPath(null);
      }
    };
    const handlePointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenOnPath(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  const toggleMenu = () => {
    setOpenOnPath((prev) => (prev === pathname ? null : pathname));
  };

  const closeMenu = () => {
    setOpenOnPath(null);
  };

  return (
    <>
      <motion.div
        ref={navRef}
        className="majd-navbar-wrap"
        initial={{ opacity: 0.001, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          bounce: 0,
          delay: 0.5,
          duration: 1.1,
        }}
      >
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
                aria-label={
                  isOpen ? "Close navigation menu" : "Open navigation menu"
                }
              >
                <span className="majd-hamburger-dot" />
                <span className="majd-hamburger-dot" />
                <span className="majd-hamburger-dot" />
              </button>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="dropdown"
                  className="majd-navbar-dropdown"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.32,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="majd-navbar-dropdown-inner">
                    {NAV_LINKS.map((item) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0.001, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{
                          duration: 0.28,
                          delay: item.delaySec,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          href={item.href}
                          className="majd-nav-pill"
                          onClick={closeMenu}
                        >
                          <RollingText
                            text={item.label}
                            color="#111111"
                            padding="8px 16px"
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </motion.div>

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
