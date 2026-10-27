"use client";

import type { ExperienceItem } from "@/types/portfolio.interfaces";

export interface ExperienceSectionProps {
  experiences: ExperienceItem[];
}

export function ExperienceSection(props: ExperienceSectionProps) {
  const { experiences } = props;

  return (
    <section id="experience" className="majd-section">
      <div className="majd-container">
        <div className="majd-section-header-row">
          <h2 className="majd-h2-section">Experience</h2>
          <p className="majd-p-body" style={{ color: "var(--ink-muted)" }}>
            /PRODUCTION ENGINEERING &amp; LEADERSHIP
          </p>
        </div>

        <div className="majd-experience-list">
          {experiences.map((item) => (
            <div key={item.id} className="majd-experience-card">
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p className="majd-p-small" style={{ color: "var(--ink-muted)" }}>
                  {item.period} · {item.location}
                </p>
                <h3 className="majd-h3-card">
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    {item.company}
                  </a>
                </h3>
                <p className="majd-p-body" style={{ fontWeight: 500 }}>
                  {item.role}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <p className="majd-p-body" style={{ color: "#111111" }}>
                  {item.summary}
                </p>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    paddingLeft: "18px",
                    listStyleType: "disc",
                  }}
                >
                  {item.achievements.map((achievement, idx) => (
                    <li
                      key={idx}
                      className="majd-p-small"
                      style={{ color: "rgba(17, 17, 17, 0.8)" }}
                    >
                      {achievement}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" }}>
                  {item.techStack.map((tech) => (
                    <span key={tech} className="majd-pill-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
