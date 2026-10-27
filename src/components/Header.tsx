"use client";

import { RollingText } from "@/components/RollingText";
import { PROFILE } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  sectionIds: string[];
  routePrefix?: string;
}

const NAV_LINKS: NavLinkItem[] = [
  {
    id: "about",
    label: "About",
    href: "/#bio-section",
    sectionIds: ["hero-section", "bio-section"],
  },
  {
    id: "experience",
    label: "Experience",
    href: "/#experience",
    sectionIds: ["experience"],
  },
  {
    id: "projects",
    label: "Projects",
    href: "/#projects",
    sectionIds: ["projects"],
    routePrefix: "/work",
  },
  {
    id: "open-source",
    label: "Open Source",
    href: "/#open-source",
    sectionIds: ["open-source"],
  },
  {
    id: "blog",
    label: "Blog",
    href: "/blog",
    sectionIds: ["thoughts"],
    routePrefix: "/blog",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/#contact",
    sectionIds: ["contact"],
    routePrefix: "/contact",
  },
];

export function Header() {
  const pathname = usePathname();
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const [activeNavId, setActiveNavId] = useState<string>("about");
  const [isScrolled, setIsScrolled] = useState(false);
  const [nearBottom, setNearBottom] = useState(false);
  const navWrapRef = useRef<HTMLDivElement>(null);

  const isOpen = openOnPath === pathname;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenOnPath(null);
      }
    };
    const handlePointerDown = (event: MouseEvent) => {
      if (
        navWrapRef.current &&
        !navWrapRef.current.contains(event.target as Node)
      ) {
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

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 40);
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      setNearBottom(y + winHeight >= docHeight - 520);

      if (pathname !== "/") return;

      const sectionOrder: Array<{ id: string; navId: string }> = [
        { id: "contact", navId: "contact" },
        { id: "thoughts", navId: "blog" },
        { id: "open-source", navId: "open-source" },
        { id: "projects", navId: "projects" },
        { id: "experience", navId: "experience" },
        { id: "bio-section", navId: "about" },
        { id: "hero-section", navId: "about" },
      ];

      const triggerLine = window.innerHeight * 0.35;
      for (const entry of sectionOrder) {
        const el = document.getElementById(entry.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerLine) {
            setActiveNavId(entry.navId);
            return;
          }
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const resolvedActiveId =
    pathname.startsWith("/work")
      ? "projects"
      : pathname.startsWith("/blog")
        ? "blog"
        : pathname.startsWith("/contact")
          ? "contact"
          : activeNavId;

  const toggleMenu = () => {
    setOpenOnPath((prev) => (prev === pathname ? null : pathname));
  };

  const closeMenu = () => {
    setOpenOnPath(null);
  };

  return (
    <>
      <motion.div
        ref={navWrapRef}
        className={`majd-navbar-wrap${isScrolled ? " is-scrolled" : ""}`}
        initial={{ opacity: 0.001, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
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
                <span className="majd-navbar-status-dot" aria-hidden="true" />
                <span>{PROFILE.shortName}</span>
              </Link>

              {/* Desktop Direct Navigation Links */}
              <div className="majd-navbar-desktop-links">
                {NAV_LINKS.map((item) => {
                  const isActive = resolvedActiveId === item.id;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`majd-navbar-desktop-link${isActive ? " is-active" : ""}`}
                      onClick={() => {
                        setActiveNavId(item.id);
                        closeMenu();
                      }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="majd-nav-active-pill"
                          className="majd-navbar-active-bg"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                        />
                      )}
                      <span className="majd-navbar-link-label">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="majd-navbar-actions">
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="majd-navbar-cta-desktop"
                >
                  <span>GitHub</span>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>

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
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="mobile-dropdown"
                  className="majd-navbar-dropdown"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="majd-navbar-dropdown-grid">
                    {NAV_LINKS.map((item, idx) => {
                      const isActive = resolvedActiveId === item.id;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.24,
                            delay: idx * 0.03,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <Link
                            href={item.href}
                            className={`majd-nav-pill${isActive ? " is-active-mobile" : ""}`}
                            onClick={() => {
                              setActiveNavId(item.id);
                              closeMenu();
                            }}
                          >
                            <RollingText
                              text={item.label}
                              color="#111111"
                              padding="8px 16px"
                            />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </motion.div>

      {/* Floating Bottom-Right Action Pills — auto-hide near footer/contact to prevent overlap */}
      <div
        className={`majd-floating-ctas${nearBottom ? " is-hidden" : ""}`}
        aria-hidden={nearBottom}
      >
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
