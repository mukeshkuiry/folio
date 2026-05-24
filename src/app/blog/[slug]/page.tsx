"use client";
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { BLOG_POSTS, formatDate, getPostBySlug } from "@/lib/blog-data";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { blogIndexUrl, blogPostUrl, mainSiteUrl } from "@/lib/site";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getPostBySlug(slug);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.3,
      });
    }
    if (contentRef.current) {
      gsap.from(contentRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.6,
      });
    }
  }, []);

  if (!post) {
    return (
      <section className="section" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 className="t-section" style={{ marginBottom: "2vw" }}>404</h1>
          <p className="t-body" style={{ color: "var(--color-grey-mid)", marginBottom: "2vw" }}>This post doesn&apos;t exist.</p>
          <a href={blogIndexUrl()} className="link-arrow t-caption">← Back to Blog</a>
        </div>
      </section>
    );
  }

  // Find next post
  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const nextPost = BLOG_POSTS[(currentIndex + 1) % BLOG_POSTS.length];

  return (
    <>
      <article className="blog-article">
        <header className="blog-article-header" ref={headerRef}>
          <div style={{ marginBottom: "2vw" }}>
            <a href={blogIndexUrl()} className="link-arrow t-caption" style={{ color: "var(--color-grey-mid)" }}>
              ← All Articles
            </a>
          </div>
          <div className="blog-article-meta">
            <span className="t-caption" style={{ color: "var(--color-grey-mid)" }}>
              {formatDate(post.date)}
            </span>
            <span className="t-caption" style={{ color: "var(--color-grey-mid)" }}>
              {post.readTime}
            </span>
            <span className="tag">{post.category}</span>
          </div>
          <h1 className="blog-article-title">{post.title}</h1>
          <p className="blog-article-excerpt">{post.excerpt}</p>
        </header>

        <div
          className="blog-article-content"
          ref={contentRef}
        >
          <MarkdownRenderer content={post.content} />
        </div>
      </article>

      {/* Next Post */}
      <section className="case-next">
        <span className="case-next-label">Next Article</span>
        <a href={blogPostUrl(nextPost.slug)} className="t-project" style={{ marginTop: "1vw" }}>
          {nextPost.title}
        </a>
        <span className="t-caption" style={{ color: "var(--color-grey-mid)", marginTop: "1vw" }}>
          {nextPost.category} · {nextPost.readTime}
        </span>
      </section>

      <footer className="footer-cta" data-theme="dark">
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MUKESH KUIRY. ALL RIGHTS RESERVED.</span>
          <a href={mainSiteUrl()} className="link-arrow t-caption" style={{ color: "var(--color-white)" }}>
            Back to Portfolio <span>→</span>
          </a>
        </div>
      </footer>
    </>
  );
}
