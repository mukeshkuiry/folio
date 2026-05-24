"use client";
import { useState, useEffect, useRef, memo } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, CATEGORIES, SOCIALS, type Project } from "@/lib/data";
import { WebGLImage } from "@/components/WebGLImage";
import { SiteFluidPreview } from "@/components/SiteFluidPreview";

gsap.registerPlugin(ScrollTrigger);

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll(".work-item");
    if (!items?.length) return;
    gsap.fromTo(items,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.08 }
    );
  }, [activeFilter]);

  return (
    <>
      <section className="section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid var(--color-grey-light)", paddingBottom: "2vw", marginBottom: "3vw" }}>
          <h1 className="t-section">Work Directory</h1>
          <span className="t-caption" style={{ color: "var(--color-grey-mid)" }}>{filtered.length}&nbsp;PROJECTS</span>
        </div>

        <div className="work-filters" role="tablist" aria-label="Filter projects">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`work-filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
              role="tab"
              aria-selected={activeFilter === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="work-grid" ref={gridRef} role="tabpanel">
          {filtered.length === 0 ? (
            <p className="t-body" style={{ color: "var(--color-grey-mid)", gridColumn: "1 / -1", textAlign: "center", padding: "8vw 0" }}>
              No projects in this category yet.
            </p>
          ) : (
            filtered.map((project) => (
              <WorkCard key={project.slug} project={project} />
            ))
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

const WorkCard = memo(function WorkCard({ project }: { project: Project }) {
  const itemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 40 });
    const tween = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }),
    });
    return () => tween.kill();
  }, []);

  return (
    <a
      href={project.external_url}
      className="work-item"
      ref={itemRef}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="work-thumb">
        {project.preview_url ? (
          <SiteFluidPreview
            url={project.preview_url}
            fallbackColor={project.color ?? "#141924"}
          />
        ) : (
          <WebGLImage color={project.color ?? "#C8C4BD"} style={{ position: "absolute", inset: 0, height: "100%" }} />
        )}
        <div className="work-thumb-overlay">
          <div className="work-thumb-overlay-inner">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6em" }}>
              <span className="t-caption" style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em" }}>{project.category}</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(13px,1vw,16px)" }}>↗</span>
            </div>
            <p className="work-thumb-desc">{project.description}</p>
          </div>
        </div>
      </div>
      <div className="work-item-meta">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3em" }}>
          <span className="t-project">{project.title}</span>
          <span className="t-caption" style={{ color: "var(--color-grey-mid)" }}>{project.client}</span>
        </div>
        <span className="t-caption" style={{ color: "var(--color-grey-mid)" }}>{project.year}</span>
      </div>
    </a>
  );
});

function Footer() {
  return (
    <footer className="footer-cta" data-theme="dark">
      <h2 className="footer-cta-heading"><Link href="/contact">Start a project</Link></h2>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Mukesh Kuiry</span>
        <div className="footer-socials">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path d={s.iconPath} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
