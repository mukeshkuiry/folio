"use client";

import { OpenSourceCard } from "@/components/OpenSourceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { RollingText } from "@/components/RollingText";
import { WordReveal } from "@/components/WordReveal";
import { CATEGORIES, OPEN_SOURCE_CONTRIBUTIONS, PROJECTS } from "@/lib/data";
import { useState } from "react";

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeCategory);

  return (
    <section
      id="hero-section"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "180px 20px 120px 20px",
        gap: "120px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1180px",
          display: "flex",
          flexDirection: "column",
          gap: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <div style={{ maxWidth: "620px" }}>
            <WordReveal
              text="My Brightest Creations"
              as="h1"
              className="majd-h1-page"
              trigger="mount"
              blurPx={10}
              duration={1.8}
              startDelay={0}
            />
          </div>
          <div style={{ maxWidth: "460px" }}>
            <WordReveal
              text="A showcase of my latest projects, highlighting thoughtful architecture, clear strategy, and impactful results."
              as="p"
              className="majd-p-body"
              trigger="mount"
              blurPx={10}
              duration={0.8}
              startDelay={0.2}
              staggerDelay={0.03}
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
          role="tablist"
          aria-label="Filter projects by category"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className="majd-nav-pill"
                style={{
                  backgroundColor: isActive
                    ? "#111111"
                    : "rgba(17, 17, 17, 0.08)",
                  color: isActive ? "#faf7f3" : "#111111",
                }}
              >
                <RollingText
                  text={category}
                  color={isActive ? "#faf7f3" : "#111111"}
                  padding="8px 16px"
                />
              </button>
            );
          })}
        </div>

        {/* 2-Column Projects Grid (matching CcTy8bqan.js gap: 20px) */}
        <div
          className="majd-projects-grid"
          style={{ gap: "20px" }}
          role="tabpanel"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

        {/* Open Source Contributions Showcase */}
      <div
        style={{
          width: "100%",
          maxWidth: "1280px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span className="majd-eyebrow-tag">/ UPSTREAM ENGINEERING</span>
          <WordReveal
            text="Open Source Contributions"
            as="h2"
            className="majd-h2-display"
            trigger="inView"
            blurPx={6}
            duration={0.9}
          />
          <p className="majd-p-body" style={{ color: "var(--ink-muted)" }}>
            Merged pull requests and architectural improvements across CNCF and
            open-source ecosystems.
          </p>
        </div>
        <div className="majd-os-grid">
          {OPEN_SOURCE_CONTRIBUTIONS.map((item, idx) => (
            <OpenSourceCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
