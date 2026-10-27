"use client";

import { BlogCard } from "@/components/BlogCard";
import { FormButton, type FormButtonVariant } from "@/components/FormButton";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TextArrowButton } from "@/components/TextArrowButton";
import {
  formatDate,
  getPostBySlug,
  getPostCoverImage,
  getRelatedPosts,
} from "@/lib/blog-data";
import { blogIndexUrl } from "@/lib/site";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type FormEvent, useState } from "react";

export default function BlogPostPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const post = getPostBySlug(slug);
  const [subEmail, setSubEmail] = useState("");
  const [subStatus, setSubStatus] = useState<FormButtonVariant>("default");

  if (!post) {
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
          We couldn&apos;t find the article you were looking for.
        </p>
        <TextArrowButton
          title="Back to Blog"
          href={blogIndexUrl()}
          variant="primary"
        />
      </section>
    );
  }

  const relatedPosts = getRelatedPosts(post.slug, 3);
  const coverSrc = getPostCoverImage(post.slug);

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!subEmail.trim()) return;
    setSubStatus("success");
    setSubEmail("");
  };

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
      {/* Article Section (Replicating AyF_zYQaO.js 2-column layout max-width: 1080px) */}
      <section
        id="article-section"
        style={{
          width: "100%",
          maxWidth: "1080px",
          paddingTop: "60px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          gap: "40px",
        }}
      >
        {/* Left Main Article Column */}
        <div
          style={{
            flex: "1 1 640px",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link
              href={blogIndexUrl()}
              className="majd-p-small"
              style={{
                color: "var(--ink-muted)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                width: "fit-content",
              }}
            >
              ← All Articles
            </Link>
            <h1 className="majd-h1-page" style={{ maxWidth: "800px" }}>
              {post.title}
            </h1>
            <p className="majd-p-body" style={{ maxWidth: "800px" }}>
              {post.excerpt}
            </p>
          </div>

          {/* Date & Read Time Bar + Banner Image */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <time dateTime={post.date} className="majd-p-small">
                {formatDate(post.date)}
              </time>
              <span className="majd-p-small">{post.readTime}</span>
            </div>

            <div
              style={{
                width: "100%",
                aspectRatio: "1.72 / 1",
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: "#111111",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverSrc}
                alt={post.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Rich Markdown Prose */}
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Right Sticky Newsletter Card (Replicating .framer-1s2dz28 / .framer-1q32mfl) */}
        <aside
          style={{
            width: "100%",
            maxWidth: "300px",
            position: "sticky",
            top: "110px",
            alignSelf: "flex-start",
          }}
        >
          <div
            style={{
              backgroundColor: "#111111",
              borderRadius: "18px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              border: "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <h5 className="majd-h5-sub">Join the newsletter</h5>
              <p className="majd-p-small" style={{ color: "#faf7f3" }}>
                Be the first to read new engineering deep-dives.
              </p>
            </div>

            <form
              onSubmit={handleNewsletterSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={subEmail}
                onChange={(e) => {
                  setSubEmail(e.target.value);
                  if (subStatus !== "default") setSubStatus("default");
                }}
                style={{
                  width: "100%",
                  height: "44px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "#faf7f3",
                  fontFamily: "var(--font-archivo)",
                  fontSize: "16px",
                }}
              />
              <div style={{ height: "40px" }}>
                <FormButton variant={subStatus} label="Submit" />
              </div>
            </form>
          </div>
        </aside>
      </section>

      {/* More Articles Section (Replicating .framer-1exwxsc) */}
      <section
        style={{
          width: "100%",
          maxWidth: "1080px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <h2 className="majd-h2-article">More Articles</h2>
        <div className="majd-blog-grid" style={{ gap: "20px" }}>
          {relatedPosts.map((related) => (
            <BlogCard key={related.slug} post={related} />
          ))}
        </div>
      </section>
    </div>
  );
}
