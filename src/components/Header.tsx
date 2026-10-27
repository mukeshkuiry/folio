"use client";

import { RollingText } from "@/components/RollingText";
import { PROFILE } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavLinkItem {
  label: string;
  href: string;
  delaySec: number;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: "About Me", href: "/#bio-section", delaySec: 0.1 },
  { label: "Experience", href: "/#experience", delaySec: 0.2 },
  { label: "Projects", href: "/work#hero-section", delaySec: 0.3 },
  { label: "Open Source", href: "/#open-source", delaySec: 0.35 },
  { label: "Blog", href: "/blog#hero-section", delaySec: 0.4 },
  { label: "Contact", href: "/#contact", delaySec: 0.45 },
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
      <motion.div
        className="majd-navbar-wrap"
        initial={{ opacity: 0.001, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          bounce: 0,
          delay: 1.4,
          duration: 1.6,
        }}
      >
        <motion.nav
          layout
          transition={{ type: "spring", bounce: 0, duration: 0.8 }}
          className={`majd-navbar${isOpen ? " is-open" : ""}`}
          aria-label="Primary Navigation"
        >
          <motion.div layout className="majd-navbar-inner">
            <motion.div layout="position" className="majd-navbar-top">
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
            </motion.div>

            {isOpen && (
              <div className="majd-navbar-dropdown">
                {NAV_LINKS.map((item) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0.001, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.8,
                      delay: item.delaySec,
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
            )}
          </motion.div>
        </motion.nav>
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
