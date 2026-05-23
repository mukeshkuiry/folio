"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, CATEGORIES } from "@/lib/data";
import { WebGLImage } from "@/components/WebGLImage";

gsap.registerPlugin(ScrollTrigger);

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll(".work-item");
    if (!items) return;
    gsap.from(items, {
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.08,
    });
  }, [activeFilter]);

  return (
    <>
      <section className="section">
        <h1 className="t-section" style={{ marginBottom: "6vw" }}>Work</h1>

        {/* Category filters */}
        <div className="work-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`work-filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="work-grid" ref={gridRef}>
          {filtered.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

function WorkCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const itemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;
    const tween = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => gsap.from(el, { opacity: 0, y: 50, duration: 0.7, ease: "power2.out" }),
    });
    return () => tween.kill();
  }, []);

  return (
    <Link href={`/work/${project.slug}`} className="work-item" ref={itemRef}>
      <div className="work-thumb">
        <WebGLImage color={project.color ?? "#C8C4BD"} style={{ position: "absolute", inset: 0, height: "100%" }} />
      </div>
      <div className="work-item-meta">
        <span className="t-project">{project.title}</span>
        <span className="t-caption" style={{ color: "var(--color-grey-mid)" }}>{project.year}</span>
      </div>
      <p className="t-caption" style={{ color: "var(--color-grey-mid)", marginTop: "0.5vw" }}>{project.category}</p>
    </Link>
  );
}

function Footer() {
  return (
    <footer className="footer-cta">
      <h2 className="footer-cta-heading"><Link href="/contact">Start a project</Link></h2>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Zajno Studio</span>
        <div className="footer-socials">
          {["Instagram", "Twitter", "Dribbble"].map((s) => (
            <a href="#" key={s} className="footer-social-link t-caption">{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
