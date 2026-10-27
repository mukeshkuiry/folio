"use client";

import { BlogCard } from "@/components/BlogCard";
import { RollingText } from "@/components/RollingText";
import { WordReveal } from "@/components/WordReveal";
import { BLOG_POSTS } from "@/lib/blog-data";
import { useMemo, useState } from "react";

export default function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    for (const post of BLOG_POSTS) {
      set.add(post.category);
    }
    return Array.from(set);
  }, []);

  const filteredPosts =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

  return (
    <section id="hero-section" className="majd-subpage-shell">
      <div className="majd-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "12px",
          }}
        >
          <div style={{ maxWidth: "620px" }}>
            <WordReveal
              text="My Brightest Thoughts"
              as="h1"
              className="majd-h1-page"
              trigger="mount"
              blurPx={6}
              duration={1.0}
              startDelay={0}
            />
          </div>
          <div style={{ maxWidth: "480px" }}>
            <WordReveal
              text="Deep-dive articles on distributed consensus, Golang microservices, database internals, and cloud-native architecture."
              as="p"
              className="majd-p-body"
              trigger="mount"
              blurPx={4}
              duration={0.8}
              startDelay={0.12}
              staggerDelay={0.025}
            />
          </div>
        </div>

        {/* Category Filter Pills (matching /work minimal design) */}
        <div
          className="majd-filter-pills-row"
          role="tablist"
          aria-label="Filter articles by category"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className="majd-nav-pill"
                style={{
                  backgroundColor: isActive
                    ? "#111111"
                    : "rgba(17, 17, 17, 0.08)",
                  color: isActive ? "#faf7f3" : "#111111",
                }}
              >
                <RollingText
                  text={category}
                  color={isActive ? "#faf7f3" : "#111111"}
                  padding="8px 16px"
                />
              </button>
            );
          })}
        </div>

        {/* 3-Column Blog Card Grid */}
        <div className="majd-blog-grid">
          {filteredPosts.map((post, idx) => (
            <BlogCard key={post.slug} post={post} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
