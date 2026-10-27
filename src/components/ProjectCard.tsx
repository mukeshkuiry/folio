"use client";

import type { Project } from "@/types/portfolio.interfaces";
import { motion } from "framer-motion";
import Link from "next/link";

export interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard(props: ProjectCardProps) {
  const { project, index = 0 } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.72,
        delay: (index % 2) * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ width: "100%" }}
    >
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
          <span className="majd-project-corner-pill" aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </span>
        </div>
        <div className="majd-project-meta">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "12px",
              width: "100%",
            }}
          >
            <h3 className="majd-h3-card">{project.title}</h3>
            <span
              className="majd-p-small"
              style={{ color: "var(--ink-muted)", whiteSpace: "nowrap" }}
            >
              {project.category} · {project.year}
            </span>
          </div>
          <p className="majd-p-small" style={{ color: "var(--ink-muted)" }}>
            {project.shortDescription}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
