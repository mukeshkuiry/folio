"use client";

import { OpenSourceCard } from "@/components/OpenSourceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { RollingText } from "@/components/RollingText";
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
            gap: "12px",
          }}
        >
          <h1 className="majd-h1-page" style={{ maxWidth: "620px" }}>
            My Brightest Creations
          </h1>
          <p
            className="majd-p-body"
            style={{ color: "#111111", maxWidth: "480px" }}
          >
            A showcase of my latest production systems, native macOS utilities,
            and distributed backends—highlighting clean architecture and
            real-world impact.
          </p>
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
          maxWidth: "1180px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h2 className="majd-h2-display">Open Source Contributions</h2>
          <p className="majd-p-body" style={{ color: "var(--ink-muted)" }}>
            Merged pull requests and architectural improvements across CNCF and
            open-source ecosystems.
          </p>
        </div>
        <div className="majd-flip-grid">
          {OPEN_SOURCE_CONTRIBUTIONS.map((item) => (
            <OpenSourceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
