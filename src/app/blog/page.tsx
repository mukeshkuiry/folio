"use client";

import { BlogCard } from "@/components/BlogCard";
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
          <h1 className="majd-h1-page" style={{ maxWidth: "620px" }}>
            My Brightest Thoughts
          </h1>
          <p
            className="majd-p-body"
            style={{ color: "#111111", maxWidth: "460px" }}
          >
            Deep-dive articles on distributed consensus, Golang microservices,
            database internals, and cloud-native architecture.
          </p>
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
