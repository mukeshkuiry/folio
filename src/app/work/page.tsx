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
    <section id="hero-section" className="majd-subpage-shell">
      <div className="majd-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "12px",
          }}
        >
          <div style={{ maxWidth: "620px" }}>
            <WordReveal
              text="My Brightest Creations"
              as="h1"
              className="majd-h1-page"
              trigger="mount"
              blurPx={6}
              duration={1.0}
              startDelay={0}
            />
          </div>
          <div style={{ maxWidth: "480px" }}>
            <WordReveal
              text="A showcase of my latest projects, highlighting thoughtful architecture, clear strategy, and impactful results."
              as="p"
              className="majd-p-body"
              trigger="mount"
              blurPx={4}
              duration={0.8}
              startDelay={0.12}
              staggerDelay={0.025}
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          className="majd-filter-pills-row"
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

        {/* 2-Column Projects Grid */}
        <div
          className="majd-projects-grid"
          style={{ gap: "24px" }}
          role="tabpanel"
        >
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}
        </div>
      </div>

      {/* Open Source Contributions Showcase */}
      <div className="majd-container" style={{ gap: "40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <WordReveal
            text="Open Source Contributions"
            as="h2"
            className="majd-h2-display"
            trigger="inView"
            blurPx={6}
            duration={1.0}
          />
          <p className="majd-p-body" style={{ color: "var(--ink-muted)" }}>
            Merged pull requests and architectural improvements across CNCF and
            open-source ecosystems.
          </p>
        </div>
        <div className="majd-flip-grid">
          {OPEN_SOURCE_CONTRIBUTIONS.map((item, idx) => (
            <OpenSourceCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
