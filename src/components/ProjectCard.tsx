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
    <motion.article
      className="majd-project-card-shell"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: (index % 2) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/work/${project.slug}#work-section`}
        className="majd-project-img-link"
        aria-label={`View ${project.title} case study`}
      >
        <div className="majd-project-img-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.heroImage}
            alt={project.title}
            className="majd-project-img"
            loading="lazy"
          />
          <div className="majd-project-img-badges">
            <span className="majd-project-cat-pill">{project.category}</span>
            <span className="majd-project-year-pill">{project.year}</span>
          </div>
          <div className="majd-project-hover-cta">
            <span>View Case Study</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </div>
        </div>
      </Link>

      <div className="majd-project-body">
        <div className="majd-project-title-row">
          <div className="majd-project-title-group">
            <Link
              href={`/work/${project.slug}#work-section`}
              className="majd-project-title-link"
            >
              <h3 className="majd-h3-card majd-project-title">
                {project.title}
              </h3>
            </Link>
            <p className="majd-project-subtitle">{project.shortDescription}</p>
          </div>

          <div className="majd-project-actions">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="majd-project-ext-btn"
              title={`Open ${project.title}`}
              aria-label={`Open ${project.title} external link`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>

        <p className="majd-project-desc">{project.description}</p>

        {project.metrics.length > 0 && (
          <div className="majd-project-metrics-bar">
            {project.metrics.slice(0, 3).map((metric) => (
              <div key={metric.label} className="majd-project-metric-cell">
                <span className="majd-project-metric-val">{metric.value}</span>
                <span className="majd-project-metric-lbl">{metric.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="majd-project-footer-row">
          <div className="majd-project-tech-list">
            {project.techStack.slice(0, 5).map((tech) => (
              <span key={tech} className="majd-pill-badge">
                {tech}
              </span>
            ))}
          </div>

          <Link
            href={`/work/${project.slug}#work-section`}
            className="majd-project-case-link"
          >
            <span>Architecture</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
