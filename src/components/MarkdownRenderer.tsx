"use client";

import hljs from "highlight.js";
import { marked } from "marked";
import { useEffect, useMemo, useRef } from "react";

export interface MarkdownRendererProps {
  content: string;
}

const renderer = new marked.Renderer();

renderer.code = (code: string, infostring: string | undefined) => {
  const lang = infostring?.split(/\s+/)[0] ?? "";
  const language = lang && hljs.getLanguage(lang) ? lang : "plaintext";
  const highlighted = hljs.highlight(
    code.replace(/\n{3,}/g, "\n\n").trim(),
    { language }
  ).value;
  return `<pre class="code-block" data-lang="${lang}"><code class="hljs language-${language}">${highlighted}</code></pre>`;
};

marked.setOptions({ renderer });

export function MarkdownRenderer(props: MarkdownRendererProps) {
  const { content } = props;
  const ref = useRef<HTMLDivElement>(null);

  const body = content.trim().replace(/^#\s+[^\n]*\n?/, "").trim();
  const html = useMemo(() => marked.parse(body) as string, [body]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>(".code-block").forEach((block) => {
      if (block.querySelector(".code-copy-btn")) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-copy-btn";
      btn.textContent = "Copy";
      btn.addEventListener("click", () => {
        const code = block.querySelector("code")?.innerText ?? "";
        void navigator.clipboard.writeText(code).then(() => {
          btn.textContent = "Copied";
          btn.classList.add("copied");
          setTimeout(() => {
            btn.textContent = "Copy";
            btn.classList.remove("copied");
          }, 2000);
        });
      });
      block.appendChild(btn);
    });
  }, [html]);

  return (
    <div
      ref={ref}
      className="blog-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
