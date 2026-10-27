"use client";

import { BlogCard } from "@/components/BlogCard";
import { WordReveal } from "@/components/WordReveal";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function BlogListPage() {
  return (
    <section
      id="hero-section"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "180px 20px 120px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1080px",
          display: "flex",
          flexDirection: "column",
          gap: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
          }}
        >
          <div style={{ maxWidth: "620px" }}>
            <WordReveal
              text="My Brightest Thoughts"
              as="h1"
              className="majd-h1-page"
              trigger="mount"
              blurPx={10}
              duration={1.8}
              startDelay={0}
            />
          </div>
          <div style={{ maxWidth: "460px" }}>
            <WordReveal
              text="Deep-dive articles on distributed consensus, Golang microservices, database internals, and cloud-native architecture."
              as="p"
              className="majd-p-body"
              trigger="mount"
              blurPx={10}
              duration={0.8}
              startDelay={0.2}
              staggerDelay={0.03}
            />
          </div>
        </div>

        {/* 3-Column Blog Card Grid (matching HpHbG8OLS.js .framer-bv39vk) */}
        <div className="majd-blog-grid">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
