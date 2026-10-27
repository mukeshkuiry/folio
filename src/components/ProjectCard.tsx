"use client";

import type { Project } from "@/types/portfolio.interfaces";
import { motion } from "framer-motion";
import Link from "next/link";

export interface ProjectCardProps {
  project: Project;
}

export function ProjectCard(props: ProjectCardProps) {
  const { project } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        type: "spring",
        bounce: 0,
        delay: 0.2,
        duration: 1.6,
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
        </div>
        <div className="majd-project-meta">
          <h3 className="majd-h3-card">{project.title}</h3>
          <p className="majd-p-small" style={{ color: "#111111" }}>
            {project.shortDescription}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
