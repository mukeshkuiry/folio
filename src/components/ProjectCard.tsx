"use client";

import type { Project } from "@/types/portfolio.interfaces";
import Link from "next/link";

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard(props: ProjectCardProps) {
  const { project } = props;

  return (
    <Link
      href={`/work/${project.slug}#work-section`}
      className="majd-project-card"
    >
      <div className="majd-project-img-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.heroImage}
          alt={project.title}
          className="majd-project-img"
          loading="lazy"
        />
      </div>
      <div className="majd-project-meta">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            width: "100%",
            gap: "12px",
          }}
        >
          <h3 className="majd-h3-card">{project.title}</h3>
          <span className="majd-p-small" style={{ color: "var(--ink-muted)" }}>
            {project.year}
          </span>
        </div>
        <p className="majd-p-small" style={{ color: "#111111" }}>
          {project.shortDescription}
        </p>
      </div>
    </Link>
  );
}
