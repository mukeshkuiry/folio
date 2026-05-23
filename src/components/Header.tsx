"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import clsx from "clsx";

const NAV_ITEMS = [
  { label: "Project Index", href: "/#directory" },
  { label: "Profile", href: "/#profile" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const lastScrollY = useRef(0);

  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastScrollY.current && y > 100);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    if (menuOpen) closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function openMenu() {
    setMenuOpen(true);
    const overlay = overlayRef.current;
    if (!overlay) return;
    overlay.classList.add("is-open");
    gsap.to(overlay, { opacity: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(navLinksRef.current.filter(Boolean), {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.07,
      delay: 0.2,
    });
  }

  function closeMenu() {
    const overlay = overlayRef.current;
    if (!overlay) return;
    gsap.to(navLinksRef.current.filter(Boolean).reverse(), {
      y: "110%",
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      stagger: 0.04,
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            overlay.classList.remove("is-open");
            setMenuOpen(false);
          },
        });
      },
    });
  }

  return (
    <>
      <header className={clsx("header", hidden && !menuOpen && "hidden")}>
        <Link href="/" className="header-logo">WESTERN ARCH</Link>
        <button
          className="header-menu-btn"
          onClick={openMenu}
          aria-label="Open menu"
        >
          Menu
        </button>
      </header>

      {/* Full-screen menu overlay */}
      <div className="menu-overlay" ref={overlayRef}>
        <div className="menu-overlay-header">
          <span className="menu-overlay-logo">WESTERN ARCH</span>
          <button className="menu-close-btn" onClick={closeMenu} aria-label="Close menu">
            Close
          </button>
        </div>

        <nav className="menu-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item, i) => (
            <div className="menu-nav-item" key={item.href}>
              <Link
                href={item.href}
                className="menu-nav-link"
                ref={(el) => { navLinksRef.current[i] = el; }}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="menu-footer">
          <span className="menu-email">PERSONAL WORKSPACE (V1.0)</span>
          <a href="https://github.com/westernarch" className="menu-email" target="_blank" rel="noopener noreferrer">
            github.com/westernarch
          </a>
        </div>
      </div>
    </>
  );
}
