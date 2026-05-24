"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import clsx from "clsx";
import { SOCIALS } from "@/lib/data";
import { blogIndexUrl } from "@/lib/site";

const NAV_ITEMS = [
  { label: "Home", href: "/", index: "01." },
  { label: "Work", href: "/work", index: "02." },
  { label: "Blog", href: blogIndexUrl(), index: "03." },
  { label: "Profile", href: "/#profile", index: "04." },
  { label: "Contact", href: "/contact", index: "05." },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastScrollY.current && y > 100);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    gsap.to(navLinksRef.current.filter(Boolean).reverse(), {
      y: "110%", opacity: 0, duration: 0.35, ease: "power2.in", stagger: 0.04,
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 0, duration: 0.4, ease: "power2.in",
          onComplete: () => { overlay.classList.remove("is-open"); setMenuOpen(false); },
        });
      },
    });
  }, []);

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
      y: "0%", opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.07, delay: 0.2,
    });
  }

  // Keyboard accessibility: close on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header className={clsx("header", hidden && !menuOpen && "hidden")}>
        <Link href="/" className="header-logo">MUKESH KUIRY</Link>
        <button className="header-menu-btn" onClick={openMenu} aria-label="Open menu">Menu</button>
      </header>

      <div className="menu-overlay" ref={overlayRef} data-theme="dark" role="dialog" aria-modal="true" aria-label="Navigation menu">
        <div className="menu-overlay-header">
          <span className="menu-overlay-logo">MUKESH KUIRY</span>
          <button className="menu-close-btn" onClick={closeMenu} aria-label="Close menu">Close</button>
        </div>
        <nav className="menu-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item, i) => (
            <div className="menu-nav-item" key={item.href}>
              <Link href={item.href} className="menu-nav-link" ref={(el) => { navLinksRef.current[i] = el; }} onClick={closeMenu}>
                <span className="menu-nav-index">{item.index}</span>
                {item.label}
              </Link>
            </div>
          ))}
        </nav>
        <div className="menu-footer">
          <a href="mailto:mukeshkk3162@gmail.com" className="menu-email">mukeshkk3162@gmail.com</a>
          <div style={{ display: "flex", gap: "1.4em", alignItems: "center" }}>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} className="menu-social-icon" target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d={s.iconPath} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
