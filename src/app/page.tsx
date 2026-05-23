"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/lib/data";
import { WebGLImage } from "@/components/WebGLImage";

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
      <div className="hero-content">
        <h1 className="t-hero">
          {["Independent engineering", "focused on utility", "and clean execution."].map((line, i) => (
            <span className="hero-line-wrap" key={i}>
              <span className="hero-line" ref={(el) => { linesRef.current[i] = el; }} style={{ display: "block" }}>{line}</span>
            </span>
          ))}
        </h1>
        <div style={{ marginTop: "4vw", borderTop: "1px solid var(--color-grey-light)", paddingTop: "2vw", display: "flex", alignItems: "flex-start", gap: "6vw" }}>
          <p className="t-caption" style={{ color: "var(--color-grey-mid)", whiteSpace: "nowrap", paddingTop: "0.3em" }}>PERSONAL WORKSPACE&nbsp;(V1.0)</p>
          <p className="t-body" style={{ color: "var(--color-grey-mid)", maxWidth: "36vw" }}>
            Western Arch is a dedicated workspace for specialized web software. Every tool is built independently to provide immediate utility, local data isolation, and absolute visual continuity.
          </p>
        </div>
        <Link href="#directory" className="link-arrow t-caption" style={{ marginTop: "3vw", display: "inline-flex" }}>
          Explore Directory <span style={{ marginLeft: "0.4em" }}>→</span>
        </Link>
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
    const st2 = ScrollTrigger.create({
      trigger: metaRef.current, start: "top 85%",
      onEnter: () => gsap.from(metaRef.current, { y: 18, opacity: 0, duration: 0.7, ease: "power3.out" }),
    });
    return () => { st1.kill(); st2.kill(); };
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
        <WebGLImage color={project.color ?? "#C8C4BD"} style={{ position: "absolute", inset: 0 }} />
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

const MARQUEE_ITEMS = ["TypeScript", "Go", "Node.js", "Swift", "React", "Next.js", "Tailwind CSS", "WebGL"];
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
    { label: "Core Engineering", value: "TypeScript, Go, Node.js, Swift" },
    { label: "Interface Layer", value: "React, Next.js, Tailwind CSS, WebGL" },
    { label: "System Stance", value: "Data Isolation, Zero-Server Dependency, Performance Constraints" },
  ];
  return (
    <section id="profile" className="section" style={{ borderTop: "1px solid var(--color-grey-light)" }}>
      <div className="about-teaser">
        <div>
          <p className="about-label">The Engineer</p>
          <a href="https://github.com/westernarch" className="link-arrow t-caption" style={{ marginTop: "2vw" }} target="_blank" rel="noopener noreferrer">
            github.com/westernarch <span>→</span>
          </a>
        </div>
        <div>
          <p className="about-text">
            I handle the entire pipeline of my applications—from core system mechanics to user interface layout. By maintaining control over the entire codebase, I ensure that any standalone utility within this ecosystem behaves predictably, securely isolates client operations locally, and loads instantly.
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
    <footer className="footer-cta">
      <h2 className="footer-cta-heading" style={{ opacity: 0.08, userSelect: "none", pointerEvents: "none" }}>WESTERN<br />ARCH</h2>
      <div className="footer-bottom">
        <span>© 2026 WESTERN ARCH. ALL RIGHTS RESERVED.</span>
        <Link href="https://github.com/westernarch" className="footer-social-link t-caption" target="_blank" rel="noopener noreferrer">github.com/westernarch →</Link>
        <span>DESIGNED WITH STRUCTURAL DISCIPLINE.</span>
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
          <h2 className="t-section">Project Directory</h2>
          <span className="t-caption" style={{ color: "var(--color-grey-mid)" }}>{PROJECTS.length}&nbsp;TOOLS&nbsp;ACTIVE</span>
        </div>
        <div style={{ marginTop: "5vw" }}>
          {PROJECTS.map((p, i) => <ProjectItem key={p.slug} project={p} index={i} />)}
        </div>
      </section>
      <Marquee />
      <AboutTeaser />
      <FooterCTA />
    </>
  );
}
