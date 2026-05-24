"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BLOG_POSTS, formatDate } from "@/lib/blog-data";
import { blogPostUrl, mainSiteUrl } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function BlogListPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.3 });
    }
    postsRef.current.filter(Boolean).forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el!,
        start: "top 88%",
        once: true,
        onEnter: () => gsap.from(el!, { y: 24, opacity: 0, duration: 0.6, delay: i * 0.06, ease: "power2.out" }),
      });
    });
  }, []);

  return (
    <>
      <section className="section">
        <div ref={headerRef}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid var(--color-grey-light)", paddingBottom: "1.5vw", marginBottom: "2vw" }}>
            <h1 className="t-section">Writing &amp; Thinking</h1>
            <span className="t-caption" style={{ color: "var(--color-grey-mid)" }}>{BLOG_POSTS.length}&nbsp;ARTICLES</span>
          </div>
          <p className="t-body" style={{ color: "var(--color-grey-mid)", maxWidth: "48vw" }}>
            Longform notes on distributed systems, backend engineering, and the decisions that make or break software at scale.
          </p>
        </div>

        <div className="blog-list" style={{ marginTop: "4vw" }}>
          {BLOG_POSTS.map((post, i) => (
            <article
              key={post.slug}
              className="blog-list-item"
              ref={(el) => { postsRef.current[i] = el; }}
            >
              <a href={blogPostUrl(post.slug)} className="blog-list-link">
                <span className="blog-list-index t-caption">{String(i + 1).padStart(2, "0")}</span>
                <div className="blog-list-accent" style={{ background: post.coverColor }} />
                <div className="blog-list-body">
                  <div className="blog-list-meta">
                    <span className="tag">{post.category}</span>
                    <span className="t-caption" style={{ color: "var(--color-grey-mid)" }}>{post.readTime}</span>
                    {post.featured && <span className="tag" style={{ borderColor: "var(--color-dark)", color: "var(--color-dark)" }}>Featured</span>}
                  </div>
                  <h2 className="blog-list-title">{post.title}</h2>
                  <p className="blog-list-excerpt">{post.excerpt}</p>
                </div>
                <div className="blog-list-cta">
                  <span className="t-caption" style={{ color: "var(--color-grey-mid)" }}>{formatDate(post.date)}</span>
                  <span className="link-arrow t-caption">Read <span>→</span></span>
                </div>
              </a>
            </article>
          ))}
        </div>
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
