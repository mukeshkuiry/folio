import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  // Check if it's the blog subdomain
  const isBlogSubdomain =
    hostname.startsWith("blog.") ||
    hostname === "blog.localhost:3000" ||
    hostname.startsWith("blog.localhost");

  if (isBlogSubdomain) {
    // Rewrite to /blog routes
    url.pathname = `/blog${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};