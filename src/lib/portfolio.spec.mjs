import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

const ROOT = path.resolve(import.meta.dirname, "../..");

describe("Portfolio Data, Assets & Architecture Verification", () => {
  it("verifies all 7 curated projects, 4 experiences, 4 services, and 4 open-source contributions exist with zero placeholders", () => {
    const dataSource = fs.readFileSync(
      path.join(ROOT, "src/lib/data.ts"),
      "utf-8"
    );

    assert.ok(!dataSource.includes("TODO"), "data.ts must not contain TODO");
    assert.ok(
      !dataSource.toLowerCase().includes("lorem ipsum"),
      "data.ts must not contain lorem ipsum"
    );

    const expectedSlugs = [
      "runway",
      "clipbro",
      "codearena",
      "order-processor",
      "reel-automation",
      "committee-khata",
      "smart-tab-grouper",
    ];

    for (const slug of expectedSlugs) {
      assert.ok(
        dataSource.includes(`slug: "${slug}"`),
        `Missing curated project slug: ${slug}`
      );
      for (const idx of [1, 2, 3]) {
        const svgPath = path.join(
          ROOT,
          `public/images/projects/${slug}-${idx}.svg`
        );
        assert.ok(
          fs.existsSync(svgPath),
          `Missing project visual asset: ${svgPath}`
        );
      }
    }
  });

  it("verifies all blog posts have corresponding generated SVG cover assets", () => {
    const blogSource = fs.readFileSync(
      path.join(ROOT, "src/lib/blog-data.ts"),
      "utf-8"
    );
    const slugs = [...blogSource.matchAll(/slug:\s*"([^"]+)"/g)].map(
      (m) => m[1]
    );
    assert.ok(slugs.length >= 16, `Expected at least 16 blog posts, got ${slugs.length}`);

    for (const slug of slugs) {
      const svgPath = path.join(ROOT, `public/images/blog/${slug}.svg`);
      assert.ok(fs.existsSync(svgPath), `Missing blog cover SVG: ${svgPath}`);
    }
  });

  it("verifies all Majd-Framer design tokens and core assets exist", () => {
    const cssSource = fs.readFileSync(
      path.join(ROOT, "src/app/globals.css"),
      "utf-8"
    );

    const requiredTokens = [
      "--token-2fcd1089-c4fe-44ec-8e47-1defe3c9bd50: #faf7f3",
      "--token-e44374f3-0aa3-4326-a0ec-25df52a31057: #111111",
      "--token-fd5eaaad-cf25-4e7f-b54f-37a28b7e1282: rgba(17, 17, 17, 0.5)",
      "--token-050a7e9f-40b2-4d5e-8e58-10c5e629e538: rgba(0, 0, 0, 0.1)",
      "--token-0a96c60c-bbe1-4670-802b-91a65926c56a: rgba(250, 247, 243, 0.9)",
      "--token-57f08e2a-01d8-4ce0-89a5-f6d5488003ee: rgba(250, 247, 243, 0.1)",
      "--token-04b522f2-919f-4662-ae43-fea5b29501b9: rgba(250, 247, 243, 0.5)",
      "--token-b5ff5227-81f4-4c80-8c80-3dd60a8e9a45: rgba(250, 247, 243, 0.3)",
      "--token-f6bceadb-c212-4389-b1bb-e11537885a02: #eb4d6d",
    ];

    for (const token of requiredTokens) {
      assert.ok(cssSource.includes(token), `Missing CSS token: ${token}`);
    }

    const coreImages = [
      "public/images/noise.png",
      "public/images/holo-triangle-1.png",
      "public/images/holo-triangle-2.png",
      "public/images/mukesh-avatar.jpg",
    ];

    for (const relPath of coreImages) {
      assert.ok(
        fs.existsSync(path.join(ROOT, relPath)),
        `Missing core image asset: ${relPath}`
      );
    }
  });
});
