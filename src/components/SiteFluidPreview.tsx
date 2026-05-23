"use client";
import { useEffect, useId, useRef } from "react";

interface Ring {
  x: number; y: number;
  r: number; maxR: number;
  age: number; maxAge: number;
  speed: number;
}

interface Props {
  url: string;
  fallbackColor?: string;
  /** Radius of the distortion effect around cursor (px) */
  radius?: number;
}

export function SiteFluidPreview({ url, fallbackColor = "#141924", radius = 90 }: Props) {
  const uid        = useId().replace(/:/g, "");
  const filterId   = `site-fluid-filter-${uid}`;
  const rootRef     = useRef<HTMLDivElement>(null);
  const iframeRef   = useRef<HTMLIFrameElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const turbRef     = useRef<SVGFETurbulenceElement>(null);
  const displaceRef = useRef<SVGFEDisplacementMapElement>(null);
  const pointRef    = useRef<SVGFEPointLightElement>(null);
  const rafRef      = useRef<number>(0);

  // ── Scale iframe to simulate 1440px desktop viewport ─────────────────
  useEffect(() => {
    const fit = () => {
      const root   = rootRef.current;
      const iframe = iframeRef.current;
      if (!root || !iframe) return;
      const DESKTOP = 1440;
      const scale   = root.offsetWidth / DESKTOP;
      iframe.style.width           = `${DESKTOP}px`;
      iframe.style.height          = `${root.offsetHeight / scale}px`;
      iframe.style.transform       = `scale(${scale})`;
      iframe.style.transformOrigin = "0 0";
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (rootRef.current) ro.observe(rootRef.current);
    return () => ro.disconnect();
  }, []);

  // ── Animation: cursor-localized distortion + canvas ring visuals ─────
  useEffect(() => {
    const root   = rootRef.current;
    const canvas = canvasRef.current;
    const turb   = turbRef.current;
    const disp   = displaceRef.current;
    const point  = pointRef.current;
    if (!root || !canvas || !turb || !disp || !point) return;

    const ctx = canvas.getContext("2d")!;

    const resize = () => { canvas.width = root.offsetWidth; canvas.height = root.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(root);

    const mouse     = { x: -9999, y: -9999 };
    const prevMouse = { x: 0, y: 0 };
    let   isHover   = false;
    let   speed     = 0;
    let   phase     = 0;
    let   curScale  = 0;
    let   tgtScale  = 0;
    const rings: Ring[] = [];

    const onEnter = () => { isHover = true; };
    const onLeave = () => {
      isHover = false;
      speed = 0;
      tgtScale = 0;
      rings.length = 0;
      // Move spotlight off-screen so no distortion is visible
      mouse.x = -9999; mouse.y = -9999;
    };
    const onMove  = (e: MouseEvent) => {
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
    root.addEventListener("mousemove",  onMove);

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      phase += 0.014;

      // Update the spotlight position to follow cursor — this controls
      // where the radial mask is centered, localizing distortion.
      // The filter operates in the iframe's own coordinate space (1440px wide),
      // so we must convert mouse coords from container space to iframe space.
      const w = root.offsetWidth  || 1;
      const DESKTOP = 1440;
      const scale = w / DESKTOP;
      const iframeX = mouse.x / scale;
      const iframeY = mouse.y / scale;
      point.setAttribute("x", String(iframeX));
      point.setAttribute("y", String(iframeY));
      // z controls the spotlight cone spread — maps to our radius (also in iframe space)
      point.setAttribute("z", String(radius / scale));

      // Displacement scale: spikes on fast movement, decays to subtle ambient
      tgtScale  = isHover ? Math.min(70, 12 + speed * 1.8) : 0;
      curScale += (tgtScale - curScale) * 0.08;
      speed    *= 0.86;
      disp.setAttribute("scale", curScale.toFixed(2));

      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", onLeave);
      root.removeEventListener("mousemove",  onMove);
    };
  }, [radius]);

  return (
    <div
      ref={rootRef}
      style={{ position: "absolute", inset: 0, overflow: "hidden", background: fallbackColor }}
    >
      {/*
        SVG filter: localized distortion around cursor.
        Uses feSpecularLighting with a pointLight to create a radial spotlight mask,
        then composites the turbulence displacement only within that spotlight area.
      */}
      <svg style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
        <defs>
          <filter id={filterId} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            {/* Turbulence noise source */}
            <feTurbulence
              ref={turbRef}
              type="turbulence"
              baseFrequency="0.008 0.008"
              numOctaves="3"
              seed="2"
              result="noise"
            />
            {/* Create a spotlight mask centered on cursor */}
            <feSpecularLighting
              result="spotlight"
              specularExponent="60"
              lightingColor="white"
              surfaceScale="0"
              in="noise"
            >
              <fePointLight ref={pointRef} x="-9999" y="-9999" z="150" />
            </feSpecularLighting>
            {/* Use spotlight as alpha mask on the noise */}
            <feComposite in="noise" in2="spotlight" operator="in" result="maskedNoise" />
            {/* Displace only within the masked region */}
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

      {/* Non-interactive iframe — displacement is localized around cursor */}
      <iframe
        ref={iframeRef}
        src={url}
        title="site-preview"
        tabIndex={-1}
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           0,
          left:          0,
          border:        "none",
          display:       "block",
          pointerEvents: "none",
          filter:        `url(#${filterId})`,
        }}
      />

      {/* Subtle bottom vignette */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(15,18,25,0.06) 0%, rgba(15,18,25,0.48) 100%)",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Canvas — ripple rings & cursor glow on top */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }} />
    </div>
  );
}
