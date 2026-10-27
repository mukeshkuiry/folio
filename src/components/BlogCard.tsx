"use client";

import { formatDate, getPostCoverImage } from "@/lib/blog-data";
import { blogPostUrl } from "@/lib/site";
import type { BlogPost } from "@/types/portfolio.interfaces";
import { motion } from "framer-motion";
import Link from "next/link";

export interface BlogCardProps {
  post: Omit<BlogPost, "coverImage">;
}

export function BlogCard(props: BlogCardProps) {
  const { post } = props;
  const coverSrc = getPostCoverImage(post.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        type: "spring",
        bounce: 0.2,
        delay: 0,
        duration: 1.4,
      }}
      style={{ width: "100%" }}
    >
      <Link
        href={`${blogPostUrl(post.slug)}#article-section`}
        className="majd-blog-card"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverSrc}
          alt={post.title}
          className="majd-blog-card-img"
          loading="lazy"
        />
        <div className="majd-blog-card-overlay" />
        <div className="majd-blog-card-content">
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <p
              className="majd-p-small"
              style={{ color: "rgba(250, 247, 243, 0.72)" }}
            >
              {formatDate(post.date)} · {post.category}
            </p>
            <h3
              className="majd-h3-card"
              style={{
                color: "#faf7f3",
                fontSize: "25px",
                lineHeight: "1.22em",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {post.title}
            </h3>
          </div>
          <p
            className="majd-p-small"
            style={{
              color: "rgba(250, 247, 243, 0.76)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.excerpt}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
