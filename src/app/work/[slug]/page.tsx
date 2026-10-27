"use client";

import { ProjectCard } from "@/components/ProjectCard";
import { TextArrowButton } from "@/components/TextArrowButton";
import { getProjectBySlug, getRelatedProjects } from "@/lib/data";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function WorkDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <section
        style={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          padding: "160px 20px",
        }}
      >
        <h1 className="majd-h1-hero">Oops!</h1>
        <p className="majd-p-body">
          We couldn&apos;t find the project you were looking for.
        </p>
        <TextArrowButton title="All Projects" href="/work" variant="primary" />
      </section>
    );
  }

  const relatedProjects = getRelatedProjects(project.slug, 2);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "140px 20px 140px 20px",
        gap: "120px",
      }}
    >
      {/* Work Detail Section (Replicating mDmuV5aTK.js max-width: 1080px) */}
      <section
        id="work-section"
        style={{
          width: "100%",
          maxWidth: "1080px",
          paddingTop: "60px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {/* Header: Title + Category / Year / Live Link + Description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "80px",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Link
              href="/work"
              className="majd-p-small"
              style={{
                color: "var(--ink-muted)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                width: "fit-content",
              }}
            >
              ← Back to Work
            </Link>
            <h1 className="majd-h1-page" style={{ maxWidth: "780px" }}>
              {project.title}
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "40px",
              width: "100%",
            }}
          >
            {/* Left Metadata Row with Clash Grotesk "/" Slashes */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                gap: "20px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <p className="majd-p-small" style={{ color: "var(--ink-muted)" }}>
                  Category
                </p>
                <p className="majd-p-body">{project.category}</p>
              </div>

              <span
                style={{
                  fontFamily: "var(--font-clash)",
                  fontSize: "20px",
                  color: "rgb(153, 153, 153)",
                }}
              >
                /
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <p className="majd-p-small" style={{ color: "var(--ink-muted)" }}>
                  Year
                </p>
                <p className="majd-p-body">{project.year}</p>
              </div>

              <span
                style={{
                  fontFamily: "var(--font-clash)",
                  fontSize: "20px",
                  color: "rgb(153, 153, 153)",
                }}
              >
                /
              </span>

              <TextArrowButton
                title="Live Link"
                href={project.liveUrl}
                variant="primary"
                newTab
              />

              {project.repoUrl !== project.liveUrl && (
                <>
                  <span
                    style={{
                      fontFamily: "var(--font-clash)",
                      fontSize: "20px",
                      color: "rgb(153, 153, 153)",
                    }}
                  >
                    /
                  </span>
                  <TextArrowButton
                    title="Source Code"
                    href={project.repoUrl}
                    variant="primary"
                    newTab
                  />
                </>
              )}
            </div>

            {/* Right Overview Description */}
            <p
              className="majd-p-body"
              style={{ maxWidth: "456px", width: "100%" }}
            >
              {project.description}
            </p>
          </div>
        </div>

        {/* Hero Image 1 (aspect-ratio 1.455 / 1, border-radius 20px) */}
        <div
          style={{
            width: "100%",
            aspectRatio: "1.455 / 1",
            borderRadius: "20px",
            overflow: "hidden",
            backgroundColor: "#111111",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.heroImage}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Tech Stack Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {project.techStack.map((tech) => (
            <span key={tech} className="majd-pill-badge">
              {tech}
            </span>
          ))}
        </div>

        {/* Intro Content (max-width: 740px) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            maxWidth: "740px",
            width: "100%",
          }}
        >
          {project.introBlocks.map((block, index) => (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <h2 className="majd-h2-article">{block.heading}</h2>
              {block.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="majd-p-body">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* 2-Up Side-by-Side Images (aspect-ratio 1.333 / 1, gap: 40px) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "40px",
            width: "100%",
          }}
        >
          {project.galleryImages.map((imgSrc, idx) => (
            <div
              key={idx}
              style={{
                width: "100%",
                aspectRatio: "1.333 / 1",
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: "#111111",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgSrc}
                alt={`${project.title} visual ${idx + 2}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        {/* Body Content (max-width: 740px) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            maxWidth: "740px",
            width: "100%",
          }}
        >
          {project.bodyBlocks.map((block, index) => (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <h2 className="majd-h2-article">{block.heading}</h2>
              {block.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="majd-p-body">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Full-Width Image 4 (Replicating .framer-pv0p7v aspect-ratio 1.455 / 1) */}
        <div
          style={{
            width: "100%",
            aspectRatio: "1.455 / 1",
            borderRadius: "20px",
            overflow: "hidden",
            backgroundColor: "#111111",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.outroImage}
            alt={`${project.title} full showcase`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
          />
        </div>

        {/* Outro Content (max-width: 740px) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            maxWidth: "740px",
            width: "100%",
          }}
        >
          {project.outroBlocks.map((block, index) => (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <h2 className="majd-h2-article">{block.heading}</h2>
              {block.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="majd-p-body">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* More Projects Section (Replicating .framer-1ifgceb) */}
      <section
        style={{
          width: "100%",
          maxWidth: "1080px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <h2 className="majd-h2-display">More Projects</h2>
        <div className="majd-projects-grid">
          {relatedProjects.map((rel) => (
            <ProjectCard key={rel.slug} project={rel} />
          ))}
        </div>
      </section>
    </div>
  );
}
