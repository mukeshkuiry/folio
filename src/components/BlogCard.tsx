"use client";

import { formatDate, getPostCoverImage } from "@/lib/blog-data";
import { blogPostUrl } from "@/lib/site";
import type { BlogPost } from "@/types/portfolio.interfaces";
import { motion } from "framer-motion";
import Link from "next/link";

export interface BlogCardProps {
  post: Omit<BlogPost, "coverImage">;
  index?: number;
}

export function BlogCard(props: BlogCardProps) {
  const { post, index = 0 } = props;
  const coverSrc = getPostCoverImage(post.slug);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: (index % 3) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <Link
        href={`${blogPostUrl(post.slug)}#article-section`}
        className="majd-blog-card"
      >
        <div className="majd-blog-card-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverSrc}
            alt={post.title}
            className="majd-blog-card-img"
            loading="lazy"
          />
          <div className="majd-blog-card-top-pills">
            <span className="majd-blog-cat-pill">{post.category}</span>
            <span className="majd-blog-read-pill">{post.readTime}</span>
          </div>
        </div>

        <div className="majd-blog-card-content">
          <div className="majd-blog-meta-row">
            <time dateTime={post.date} className="majd-blog-date">
              {formatDate(post.date)}
            </time>
            <span className="majd-blog-meta-dot" aria-hidden="true" />
            <span className="majd-blog-meta-tag">Engineering Note</span>
          </div>

          <h3 className="majd-blog-card-title">{post.title}</h3>

          <p className="majd-blog-card-excerpt">{post.excerpt}</p>

          <div className="majd-blog-card-footer">
            <span>Read Article</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
