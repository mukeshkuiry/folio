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
          blurPx={6}
          duration={0.9}
        />

        <div className="majd-experience-list">
          {experiences.map((item, idx) => (
            <motion.div
              key={item.id}
              className="majd-experience-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Left Column: Company, Role, Period & Location */}
              <div className="majd-exp-left">
                <h3 className="majd-h3-card">
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="majd-exp-link"
                  >
                    <span>{item.company}</span>
                  </a>
                </h3>
                <p
                  className="majd-p-body"
                  style={{ color: "#111111", fontWeight: 500 }}
                >
                  {item.role}
                </p>
                <p
                  className="majd-p-small"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {item.period} · {item.location}
                </p>
              </div>

              {/* Right Column: Summary, Metric-Backed Pointers & Majd Dot Categories */}
              <div className="majd-exp-right">
                <p
                  className="majd-p-body"
                  style={{ color: "#111111", fontWeight: 500 }}
                >
                  {item.summary}
                </p>

                {item.achievements.length > 0 && (
                  <ul className="majd-exp-points">
                    {item.achievements.map((ach, aIdx) => {
                      const colonIndex = ach.indexOf(":");
                      const hasLabel = colonIndex > 0 && colonIndex < 48;
                      const label = hasLabel ? ach.slice(0, colonIndex + 1) : "";
                      const rest = hasLabel ? ach.slice(colonIndex + 1) : ach;

                      return (
                        <li key={aIdx} className="majd-exp-point">
                          <span
                            className="majd-service-dot majd-exp-point-dot"
                            aria-hidden="true"
                          />
                          <span className="majd-p-small majd-exp-point-text">
                            {hasLabel ? (
                              <>
                                <strong style={{ color: "#111111", fontWeight: 600 }}>
                                  {label}
                                </strong>
                                {rest}
                              </>
                            ) : (
                              ach
                            )}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <div className="majd-service-categories">
                  {item.techStack.map((tech, tIdx) => (
                    <span
                      key={tech}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      {tIdx > 0 && (
                        <span className="majd-service-dot" aria-hidden="true" />
                      )}
                      <span
                        className="majd-p-small"
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
