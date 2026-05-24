/**
 * site.ts — deployment-aware URL helpers
 *
 * Set NEXT_PUBLIC_SITE=blog  →  blog.mukeshkuiry.com deployment
 * Set NEXT_PUBLIC_SITE=main  →  mukeshkuiry.com deployment  (default)
 */

export const SITE = (process.env.NEXT_PUBLIC_SITE ?? "main") as "main" | "blog";
export const isBlogSite = SITE === "blog";

export const MAIN_URL =
  process.env.NEXT_PUBLIC_MAIN_URL ?? "https://mukeshkuiry.com";
export const BLOG_URL =
  process.env.NEXT_PUBLIC_BLOG_URL ?? "https://blog.mukeshkuiry.com";

/**
 * URL for the blog index page.
 * - On blog deployment  → "/"
 * - On main deployment  → "https://blog.mukeshkuiry.com"
 */
export function blogIndexUrl(): string {
  return isBlogSite ? "/" : BLOG_URL;
}

/**
 * URL for an individual blog post.
 * - On blog deployment  → "/<slug>"
 * - On main deployment  → "https://blog.mukeshkuiry.com/<slug>"
 */
export function blogPostUrl(slug: string): string {
  return isBlogSite ? `/${slug}` : `${BLOG_URL}/${slug}`;
}

/**
 * URL for the main (landing) site — always absolute.
 */
export function mainSiteUrl(): string {
  return MAIN_URL;
}
