"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const bg = bgRef.current;
    const count = countRef.current;
    if (!loader || !bg || !count) return;

    const tl = gsap.timeline({
      onComplete: () => {
        loader.style.pointerEvents = "none";
        loader.style.display = "none";
      },
    });

    // 1. Slide counter up into view
    tl.to(count, { y: "0%", duration: 0.5, ease: "power2.out" });

    // 2. Increment counter 0→100
    const obj = { val: 0 };
    tl.to(
      obj,
      {
        val: 100,
        duration: 2,
        ease: "power1.inOut",
        onUpdate: () => {
          count.textContent = String(Math.round(obj.val));
        },
      },
      "-=0.1"
    );

    // 3. Counter exits upward
    tl.to(count, { y: "-110%", duration: 0.4, ease: "power2.in" });

    // 4. Background fades out
    tl.to(bg, { opacity: 0, duration: 0.7, ease: "power2.inOut" }, "-=0.2");

    return () => { tl.kill(); };
  }, []);

  return (
    <div id="loader" ref={loaderRef}>
      <div id="loader-bg" ref={bgRef} />
      <div id="loader-count-wrap">
        <div id="loader-count" ref={countRef}>0</div>
      </div>
    </div>
  );
}
