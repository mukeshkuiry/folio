"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const NAME = "MUKESH";
const TAGLINE = "SOFTWARE DEVELOPER";

export function Loader() {
  const loaderRef    = useRef<HTMLDivElement>(null);
  const panelTopRef  = useRef<HTMLDivElement>(null);
  const panelBotRef  = useRef<HTMLDivElement>(null);
  const lettersRef   = useRef<HTMLSpanElement[]>([]);
  const taglineRef   = useRef<HTMLDivElement>(null);
  const barRef       = useRef<HTMLDivElement>(null);
  const countRef     = useRef<HTMLDivElement>(null);
  const statusRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader   = loaderRef.current;
    const panelTop = panelTopRef.current;
    const panelBot = panelBotRef.current;
    const letters  = lettersRef.current;
    const tagline  = taglineRef.current;
    const bar      = barRef.current;
    const count    = countRef.current;
    const status   = statusRef.current;
    if (!loader || !panelTop || !panelBot || !bar || !count || !status) return;

    const tl = gsap.timeline({
      onComplete: () => {
        loader.style.pointerEvents = "none";
        loader.style.display = "none";
      },
    });

    // ── 1. Slide in counter + status from below ─────────────────────
    tl.to([count, status], {
      y: "0%", opacity: 1,
      duration: 0.5, ease: "power2.out", stagger: 0.05,
    });

    // ── 2. Letters cascade up ───────────────────────────────────────
    tl.to(letters, {
      y: "0%", opacity: 1,
      duration: 0.7, ease: "power3.out",
      stagger: 0.06,
    }, "-=0.2");

    // ── 3. Tagline slides up ────────────────────────────────────────
    tl.to(tagline, {
      y: "0%", opacity: 1,
      duration: 0.5, ease: "power2.out",
    }, "-=0.3");

    // ── 4. Progress bar fills 0→100 ─────────────────────────────────
    const obj = { val: 0 };
    tl.to(obj, {
      val: 100,
      duration: 1.8,
      ease: "power1.inOut",
      onUpdate() {
        const v = Math.round(obj.val);
        if (bar)   bar.style.width = `${v}%`;
        if (count) count.textContent = `${v}%`;
      },
    }, "-=0.4");

    // ── 5. Pause at 100% ────────────────────────────────────────────
    tl.to({}, { duration: 0.25 });

    // ── 6. Letters scatter / fade out ───────────────────────────────
    tl.to(letters, {
      y: "-120%", opacity: 0,
      duration: 0.5, ease: "power3.in",
      stagger: { each: 0.04, from: "center" },
    });

    tl.to([tagline, count, status], {
      opacity: 0, duration: 0.3, ease: "power2.in",
    }, "<");

    // ── 7. Panels split apart (top goes up, bottom goes down) ───────
    tl.to(panelTop, {
      yPercent: -100,
      duration: 0.75, ease: "power4.inOut",
    }, "-=0.1");

    tl.to(panelBot, {
      yPercent: 100,
      duration: 0.75, ease: "power4.inOut",
    }, "<");

    return () => { tl.kill(); };
  }, []);

  return (
    <div id="loader" ref={loaderRef}>
      {/* Split panels */}
      <div id="loader-panel-top"  ref={panelTopRef} />
      <div id="loader-panel-bottom" ref={panelBotRef} />

      {/* Center content */}
      <div id="loader-content">
        {/* Animated name */}
        <div id="loader-name">
          {NAME.split("").map((ch, i) => (
            <span
              key={i}
              className="loader-letter"
              ref={el => { if (el) lettersRef.current[i] = el; }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <div id="loader-tagline">
          <div
            id="loader-tagline-inner"
            ref={taglineRef}
          >
            {TAGLINE}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div id="loader-progress-track">
        <div id="loader-progress-bar" ref={barRef} />
      </div>

      {/* Bottom-left status */}
      <div id="loader-status-wrap">
        <div id="loader-status" ref={statusRef}>Initialising</div>
      </div>

      {/* Bottom-right counter */}
      <div id="loader-count-wrap">
        <div id="loader-count" ref={countRef}>0%</div>
      </div>
    </div>
  );
}
