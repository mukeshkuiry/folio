"use client";

import { WordReveal } from "@/components/WordReveal";
import type { ExperienceItem } from "@/types/portfolio.interfaces";
import { motion } from "framer-motion";

export interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export function ExperienceSection(props: ExperienceSectionProps) {
  const { experiences } = props;

  return (
    <section id="experience" className="majd-section">
      <div className="majd-container">
        <WordReveal
          text="Experience"
          as="h2"
          className="majd-h2-section"
          trigger="inView"
          blurPx={10}
          duration={1.8}
        />

        <div className="majd-services-list">
          {experiences.map((item) => (
            <motion.div
              key={item.id}
              className="majd-experience-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                type: "spring",
                bounce: 0,
                delay: 0.2,
                duration: 1.6,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <h3 className="majd-h3-card">
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.company}
                  </a>
                </h3>
                <p className="majd-p-body" style={{ color: "#111111" }}>
                  {item.role}
                </p>
                <p className="majd-p-small" style={{ color: "var(--ink-muted)" }}>
                  {item.period} · {item.location}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <p className="majd-p-body" style={{ color: "#111111" }}>
                  {item.summary}
                </p>

                <div className="majd-service-categories">
                  {item.techStack.slice(0, 5).map((tech, idx) => (
                    <span
                      key={tech}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {idx > 0 && (
                        <span className="majd-service-dot" aria-hidden="true" />
                      )}
                      <span
                        className="majd-p-body"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        {tech}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
