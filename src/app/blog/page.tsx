"use client";

import { BlogCard } from "@/components/BlogCard";
import { RollingText } from "@/components/RollingText";
import { WordReveal } from "@/components/WordReveal";
import { BLOG_POSTS, getBlogCategories } from "@/lib/blog-data";
import { useState } from "react";

export default function BlogListPage() {
  const categories = getBlogCategories();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <section
      id="hero-section"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "160px 20px 120px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1240px",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
        }}
      >
        <div className="majd-exp-header">
          <div className="majd-exp-header-left">
            <span className="majd-eyebrow-tag">/ ENGINEERING JOURNAL</span>
            <WordReveal
              text="Systems & Architecture Notes"
              as="h1"
              className="majd-h1-page"
              trigger="mount"
              blurPx={6}
              duration={0.9}
              startDelay={0}
            />
            <p className="majd-p-body majd-section-subtitle">
              Deep-dive articles on distributed consensus, Golang microservices,
              database internals, FinTech idempotency, and cloud-native
              infrastructure.
            </p>
          </div>

          <div className="majd-blog-search-box">
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
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              placeholder="Search 26 technical articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="majd-blog-search-input"
              aria-label="Search technical articles"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
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
                    : "rgba(17, 17, 17, 0.07)",
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
