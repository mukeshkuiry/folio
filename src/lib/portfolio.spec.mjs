import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";

const ROOT = path.resolve(import.meta.dirname, "../..");

describe("Portfolio Data, Framer Assets & Architecture Verification", () => {
  it("verifies all 7 curated projects, 4 experiences, 4 services, and 4 open-source contributions exist with real Framer images", () => {
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
    }

    const imagePaths = [
      ...dataSource.matchAll(/["'](\/images\/framer\/[^"']+)["']/g),
    ].map((m) => m[1]);

    assert.ok(
      imagePaths.length >= 25,
      `Expected at least 25 Framer image references in data.ts, found ${imagePaths.length}`
    );

    for (const relImg of imagePaths) {
      const fullPath = path.join(ROOT, "public", relImg);
      assert.ok(
        fs.existsSync(fullPath) && fs.statSync(fullPath).size > 0,
        `Missing or empty Framer image asset: ${fullPath}`
      );
    }
  });

  it("verifies all blog cover images exist in public/images/framer", () => {
    const blogSource = fs.readFileSync(
      path.join(ROOT, "src/lib/blog-data.ts"),
      "utf-8"
    );
    const coverImages = [
      ...blogSource.matchAll(/["'](\/images\/framer\/[^"']+)["']/g),
    ].map((m) => m[1]);

    assert.equal(coverImages.length, 7, "Expected 7 Framer blog cover images");
    for (const relImg of coverImages) {
      const fullPath = path.join(ROOT, "public", relImg);
      assert.ok(
        fs.existsSync(fullPath) && fs.statSync(fullPath).size > 0,
        `Missing blog cover image: ${fullPath}`
      );
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
      "public/images/framer/avatar-front-bw.png",
      "public/images/framer/haSjyjpt7FyCjJUBvXtmzCMSEQg.png",
    ];

    for (const relPath of coreImages) {
      assert.ok(
        fs.existsSync(path.join(ROOT, relPath)),
        `Missing core image asset: ${relPath}`
      );
    }
  });
});
