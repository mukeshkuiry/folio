"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, SOCIALS } from "@/lib/data";
import { WebGLImage } from "@/components/WebGLImage";
import { HeroLiquidDistortion } from "@/components/HeroLiquidDistortion";
import { SiteFluidPreview } from "@/components/SiteFluidPreview";
import { MagneticButton } from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
  useEffect(() => {
    const lines = linesRef.current.filter(Boolean);
    gsap.from(lines, { yPercent: 110, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 3.5 });
  }, []);
  return (
    <section className="hero">
      <div className="hero-bg" />
      {/* WebGL Liquid Distortion overlay on the hero text */}
      <div className="hero-content">
        <div style={{ position: "relative" }}>
          <h1 className="t-hero" style={{ visibility: "hidden" }}>
            {["Independent", "engineering", "focused on utility", "and clean execution."].map((line, i) => (
              <span className="hero-line-wrap" key={i}>
                <span className="hero-line" ref={(el) => { linesRef.current[i] = el; }} style={{ display: "block" }}>{line}</span>
              </span>
            ))}
          </h1>
          <div style={{ position: "absolute", inset: 0 }}>
            <HeroLiquidDistortion />
          </div>
        </div>
        <div style={{ marginTop: "4vw", borderTop: "1px solid var(--color-grey-light)", paddingTop: "2vw", display: "flex", alignItems: "flex-start", gap: "6vw" }}>
          <p className="t-caption" style={{ color: "var(--color-grey-mid)", whiteSpace: "nowrap", paddingTop: "0.3em" }}>PERSONAL WORKSPACE&nbsp;(V1.0)</p>
          <p className="t-body" style={{ color: "var(--color-grey-mid)", maxWidth: "36vw" }}>
            A curated portfolio of work, projects, and engineering craft. From distributed backend systems to full-stack products, everything here is something I built, shipped, or obsessed over.
          </p>
        </div>

      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" style={{ display: "inline-block" }}>
          <path d="M6 1v14M1 10l5 5 5-5" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
      </div>
    </section>
  );
}

function ProjectItem({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const st1 = ScrollTrigger.create({
      trigger: wrap, start: "top 78%",
      onEnter: () => gsap.to(wrap, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.inOut" }),
    });
    const metaEl = metaRef.current;
    const st2 = metaEl ? ScrollTrigger.create({
      trigger: metaEl, start: "top 85%",
      onEnter: () => gsap.from(metaEl, { y: 18, opacity: 0, duration: 0.7, ease: "power3.out" }),
    }) : null;
    return () => { st1.kill(); st2?.kill(); };
  }, []);

  return (
    <a
      href={project.external_url}
      className="project-item"
      style={{ display: "block", marginBottom: "6vw" }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* Image */}
      <div
        className="project-image-wrap"
        ref={wrapRef}
        style={{ clipPath: "inset(100% 0% 0% 0%)", aspectRatio: "21 / 9" }}
      >
        {(project as { preview_url?: string }).preview_url ? (
          <SiteFluidPreview
            url={(project as { preview_url?: string }).preview_url!}
            fallbackColor={project.color ?? "#141924"}
          />
        ) : (
          <WebGLImage color={project.color ?? "#C8C4BD"} style={{ position: "absolute", inset: 0 }} />
        )}
      </div>

      {/* Meta bar */}
      <div
        ref={metaRef}
        style={{
          marginTop: "1.8vw",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto auto",
          alignItems: "baseline",
          gap: "2.5vw",
          borderBottom: "1px solid var(--color-grey-light)",
          paddingBottom: "1.4vw",
        }}
      >
        <span className="t-caption" style={{ color: "var(--color-grey-mid)" }}>{project.client}</span>
        <span className="project-name">{project.title}</span>
        <span className="t-body" style={{ color: "var(--color-grey-mid)", maxWidth: "34vw" }}>{project.description}</span>
        <span className="project-tag">{project.category}</span>
      </div>

      {/* Action */}
      <div style={{ marginTop: "1vw", display: "flex", justifyContent: "flex-end" }}>
        <span className="link-arrow t-caption">Open Utility <span>→</span></span>
      </div>
    </a>
  );
}

const MARQUEE_ITEMS = ["Golang", "TypeScript", "Node.js", "NestJS", "React", "Next.js", "Python", "Redis", "Kafka", "MongoDB", "Docker", "Kubernetes", "AWS", "PostgreSQL", "GitHub Actions"];
function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span className="marquee-item" key={i}>{item}<span className="marquee-dot" /></span>
        ))}
      </div>
    </div>
  );
}

function AboutTeaser() {
  const ledger = [
    { label: "Current Role", value: "Software Engineer @ Refyne India, Bengaluru" },
    { label: "Stack", value: "Golang, TypeScript, Node.js, React, Next.js, Python" },
    { label: "Infrastructure", value: "AWS, Docker, Kubernetes, Redis, Kafka, MongoDB" },
  ];
  return (
    <section id="profile" className="section" style={{ borderTop: "1px solid var(--color-grey-light)" }}>
      <div className="about-teaser">
        <div>
          <p className="about-label">The Engineer</p>
          <a href="https://github.com/mukeshkuiry" className="link-arrow t-caption" style={{ marginTop: "2vw" }} target="_blank" rel="noopener noreferrer">
            github.com/mukeshkuiry <span>→</span>
          </a>
        </div>
        <div>
          <p className="about-text">
            I care deeply about how software is built, not just that it works. Clean abstractions, resilient systems, interfaces that feel inevitable. Good engineering is invisible. That's the standard I hold myself to.
          </p>
          <div style={{ marginTop: "4vw", display: "flex", flexDirection: "column", gap: 0 }}>
            {ledger.map((item, i) => (
              <div key={i} style={{ borderTop: "1px solid var(--color-grey-light)", paddingTop: "1.4vw", paddingBottom: "1.4vw", display: "grid", gridTemplateColumns: "28% 1fr", gap: "2vw", alignItems: "start" }}>
                <span className="t-caption" style={{ color: "var(--color-grey-mid)", paddingTop: "0.2em" }}>{item.label}</span>
                <span className="t-body">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterCTA() {
  return (
    <footer className="footer-cta" data-theme="dark">
      <h2 className="footer-cta-heading" style={{ opacity: 0.08, userSelect: "none", pointerEvents: "none" }}>MUKESH<br />KUIRY</h2>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} MUKESH KUIRY. ALL RIGHTS RESERVED.</span>
        <div className="footer-socials">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path d={s.iconPath} />
              </svg>
            </a>
          ))}
        </div>
        <Link href="/contact" className="link-arrow t-caption">Get in Touch <span>→</span></Link>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="directory" className="section">
        <div style={{ marginBottom: "4vw", display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid var(--color-grey-light)", paddingBottom: "1.5vw" }}>
          <h2 className="t-section">Work Directory</h2>
          <span className="t-caption" style={{ color: "var(--color-grey-mid)" }}>{PROJECTS.length}&nbsp;PROJECTS</span>
        </div>
        <div style={{ marginTop: "5vw" }}>
          {PROJECTS.slice(0, 3).map((p, i) => <ProjectItem key={p.slug} project={p} index={i} />)}
        </div>
        <div style={{ marginTop: "4vw", paddingTop: "3vw", borderTop: "1px solid var(--color-grey-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="t-caption" style={{ color: "var(--color-grey-mid)" }}>SHOWING 3 OF {PROJECTS.length}</span>
          <MagneticButton>
            <Link href="/work" className="view-all-btn">
              View All Works <span>→</span>
            </Link>
          </MagneticButton>
        </div>
      </section>
      <Marquee />
      <AboutTeaser />
      <FooterCTA />
    </>
  );
}
