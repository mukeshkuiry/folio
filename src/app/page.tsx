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
import { WordReveal } from "@/components/WordReveal";
import { getFeaturedPosts } from "@/lib/blog-data";
import {
  EXPERIENCES,
  OPEN_SOURCE_CONTRIBUTIONS,
  PROFILE,
  PROJECTS,
  SERVICES,
} from "@/lib/data";
import { blogIndexUrl } from "@/lib/site";
import { motion } from "framer-motion";

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(2);
  const featuredProjects = PROJECTS.slice(0, 4);

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
          <WordReveal
            text="Services"
            as="h2"
            className="majd-h2-section"
            trigger="inView"
            blurPx={10}
            duration={1.8}
          />
          <div className="majd-services-list">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Projects Section (2x2 Grid matching XQuJCztg5.js limit: 4) */}
      <section id="projects" className="majd-section">
        <div className="majd-container">
          <div className="majd-section-header-row">
            <div style={{ maxWidth: "460px" }}>
              <WordReveal
                text="Featured Projects"
                as="h2"
                className="majd-h2-section"
                trigger="inView"
                blurPx={10}
                duration={1.8}
              />
            </div>
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

      {/* 6. Open Source & Engineering Impact (4-Column 3D Scroll-Flip Cards) */}
      <section id="open-source" className="majd-section">
        <div className="majd-container">
          <WordReveal
            text="Open Source"
            as="h2"
            className="majd-h2-section"
            trigger="inView"
            blurPx={10}
            duration={1.8}
          />

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
          <WordReveal
            text="Thoughts"
            as="h2"
            className="majd-h2-section"
            trigger="inView"
            blurPx={10}
            duration={1.8}
          />

          <div className="majd-blog-grid">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}

            <motion.div
              className="majd-all-posts-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                type: "spring",
                bounce: 0.2,
                delay: 0,
                duration: 1.4,
              }}
            >
              <WordReveal
                text="See how we shape systems with clarity and craft— explore our blog"
                as="p"
                className="majd-p-display"
                color="#faf7f3"
                trigger="inView"
                blurPx={10}
                duration={1.4}
                staggerDelay={0.04}
              />
              <TextArrowButton
                title="View All Work"
                href={`${blogIndexUrl()}#hero-section`}
                variant="white"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. Contact Section */}
      <ContactSection />
    </>
  );
}
