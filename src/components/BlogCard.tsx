"use client";

import { formatDate, getPostCoverImage } from "@/lib/blog-data";
import { blogPostUrl } from "@/lib/site";
import type { BlogPost } from "@/types/portfolio.interfaces";
import Link from "next/link";

export interface BlogCardProps {
  post: Omit<BlogPost, "coverImage">;
}

export function BlogCard(props: BlogCardProps) {
  const { post } = props;
  const coverSrc = getPostCoverImage(post.slug);

  return (
    <Link href={`${blogPostUrl(post.slug)}#article-section`} className="majd-blog-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={coverSrc}
        alt={post.title}
        className="majd-blog-card-img"
        loading="lazy"
      />
      <div className="majd-blog-card-overlay" />
      <div className="majd-blog-card-content">
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <p className="majd-p-small" style={{ color: "#faf7f3" }}>
            {formatDate(post.date)} · {post.readTime}
          </p>
          <h3 className="majd-h3-card" style={{ color: "#faf7f3" }}>
            {post.title}
          </h3>
        </div>
        <p
          className="majd-p-small"
          style={{
            color: "rgba(250, 247, 243, 0.85)",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}
