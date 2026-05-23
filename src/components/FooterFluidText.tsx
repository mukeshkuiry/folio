"use client";
import { useEffect, useId, useRef } from "react";

export function FooterFluidText() {
  const uid         = useId().replace(/:/g, "");
  const filterId    = `footer-fluid-filter-${uid}`;
  const rootRef     = useRef<HTMLDivElement>(null);
  const displaceRef = useRef<SVGFEDisplacementMapElement>(null);
  const pointRef    = useRef<SVGFEPointLightElement>(null);
  const rafRef      = useRef<number>(0);

  useEffect(() => {
    const root   = rootRef.current;
    const disp   = displaceRef.current;
    const point  = pointRef.current;
    if (!root || !disp || !point) return;

    const mouse     = { x: -9999, y: -9999 };
    const prevMouse = { x: 0, y: 0 };
    let isHover     = false;
    let speed       = 0;
    let curScale    = 0;
    let tgtScale    = 0;

    const onEnter = () => { isHover = true; };
    const onLeave = () => {
      isHover = false;
      speed = 0;
      tgtScale = 0;
      mouse.x = -9999; mouse.y = -9999;
    };
    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      const dx = mouse.x - prevMouse.x;
      const dy = mouse.y - prevMouse.y;
      speed = Math.sqrt(dx * dx + dy * dy);
      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;
    };

    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mouseleave", onLeave);
    root.addEventListener("mousemove", onMove);

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      point.setAttribute("x", String(mouse.x));
      point.setAttribute("y", String(mouse.y));
      point.setAttribute("z", "80");

      tgtScale  = isHover ? Math.min(40, 8 + speed * 1.4) : 0;
      curScale += (tgtScale - curScale) * 0.07;
      speed    *= 0.84;
      disp.setAttribute("scale", curScale.toFixed(2));
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", onLeave);
      root.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      style={{ position: "relative", width: "100%", userSelect: "none", cursor: "none" }}
    >
      {/* SVG filter definition */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <defs>
          <filter
            id={filterId}
            x="-5%" y="-15%"
            width="110%" height="130%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.006 0.006"
              numOctaves="3"
              seed="4"
              result="noise"
            />
            <feSpecularLighting
              result="spotlight"
              specularExponent="55"
              lightingColor="white"
              surfaceScale="0"
              in="noise"
            >
              <fePointLight ref={pointRef} x="-9999" y="-9999" z="80" />
            </feSpecularLighting>
            <feComposite in="noise" in2="spotlight" operator="in" result="maskedNoise" />
            <feDisplacementMap
              ref={displaceRef}
              in="SourceGraphic"
              in2="maskedNoise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* The text — filter applied directly */}
      <div
        aria-hidden="true"
        style={{
          filter: `url(#${filterId})`,
          padding: "4vw var(--content-pad-h) 3vw",
          lineHeight: 0.88,
          fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontWeight: 300,
          fontSize: "clamp(28px, 5.5vw, 100px)",
          letterSpacing: "-0.025em",
          color: "rgba(255,255,255,0.09)",
          pointerEvents: "none",
          textAlign: "left",
        }}
      >
        MUKESH<br />KUIRY
      </div>
    </div>
  );
}
