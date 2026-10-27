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
      <div className="majd-container majd-container-exp">
        <WordReveal
          text="Experience"
          as="h2"
          className="majd-h2-section"
          trigger="inView"
          blurPx={10}
          duration={1.8}
        />

        <div className="majd-services-list">
          {experiences.map((item, idx) => (
            <motion.div
              key={item.id}
              className="majd-experience-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <h3 className="majd-h3-card">
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="majd-exp-company-link"
                  >
                    <span>{item.company}</span>
                    <span className="majd-exp-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </h3>
                <p className="majd-p-body" style={{ color: "#111111" }}>
                  {item.role}
                </p>
                <p className="majd-p-small" style={{ color: "var(--ink-muted)" }}>
                  {item.period} · {item.location}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <p className="majd-p-body" style={{ color: "#111111" }}>
                  {item.summary}
                </p>

                {item.achievements.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    {item.achievements.slice(0, 2).map((ach, aIdx) => (
                      <p
                        key={aIdx}
                        className="majd-p-small"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        — {ach}
                      </p>
                    ))}
                  </div>
                )}

                <div className="majd-service-categories">
                  {item.techStack.slice(0, 6).map((tech, idx) => (
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
