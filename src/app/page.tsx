"use client";

import { BlogCard } from "@/components/BlogCard";
import { ContactSection } from "@/components/ContactSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { HeroBioSection } from "@/components/HeroBioSection";
import { OpenSourceCard } from "@/components/OpenSourceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollColorText } from "@/components/ScrollColorText";
import { ServiceCard } from "@/components/ServiceCard";
import { TextArrowButton } from "@/components/TextArrowButton";
import { getFeaturedPosts } from "@/lib/blog-data";
import {
  EXPERIENCES,
  OPEN_SOURCE_CONTRIBUTIONS,
  PROFILE,
  PROJECTS,
  SERVICES,
} from "@/lib/data";
import { blogIndexUrl } from "@/lib/site";

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(2);
  const featuredProjects = PROJECTS.slice(0, 6);

  return (
    <>
      {/* 1. Shared 200vh Hero & Bio Sections + Sticky 3D Flipping Avatar */}
      <HeroBioSection />

      {/* 2. Scroll-Scrubbed Manifesto Quote Section (150vh track) */}
      <section className="majd-quote-section">
        <div className="majd-quote-track">
          <div className="majd-quote-sticky">
            <div className="majd-quote-box">
              <ScrollColorText text={PROFILE.manifestoQuote} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services / Core Engineering Domains Section */}
      <section id="services" className="majd-section majd-section-Flush">
        <div className="majd-container">
          <h2 className="majd-h2-section">Services</h2>
          <div className="majd-services-list">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Projects Section (2-Column Grid) */}
      <section id="projects" className="majd-section">
        <div className="majd-container">
          <div className="majd-section-header-row">
            <h2 className="majd-h2-section" style={{ maxWidth: "520px" }}>
              Featured Projects
            </h2>
            <TextArrowButton
              title="View All Work"
              href="/work#hero-section"
              variant="primary"
            />
          </div>

          <div className="majd-projects-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Work Experience Timeline */}
      <ExperienceSection experiences={EXPERIENCES} />

      {/* 6. Open Source Contributions (4-Column 3D Scroll-Flip Cards) */}
      <section id="open-source" className="majd-section">
        <div className="majd-container">
          <div className="majd-section-header-row">
            <h2 className="majd-h2-section">Open Source</h2>
            <TextArrowButton
              title="GitHub Activity"
              href={PROFILE.githubUrl}
              variant="primary"
              newTab
            />
          </div>

          <div className="majd-flip-grid">
            {OPEN_SOURCE_CONTRIBUTIONS.map((item) => (
              <OpenSourceCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Thoughts / Technical Articles Section (2 Blog Cards + 1 Dark All Posts Card) */}
      <section id="thoughts" className="majd-section">
        <div className="majd-container">
          <h2 className="majd-h2-section">Thoughts</h2>

          <div className="majd-blog-grid">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}

            <div className="majd-all-posts-card">
              <p className="majd-p-display">
                See how I engineer resilient distributed systems— explore my blog
              </p>
              <TextArrowButton
                title="View All Articles"
                href={`${blogIndexUrl()}#hero-section`}
                variant="white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Contact Section */}
      <ContactSection />
    </>
  );
}
