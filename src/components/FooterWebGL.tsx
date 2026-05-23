"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export function FooterWebGL() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999, radius: 140 };
    let raf: number;

    function createParticles() {
      if (!canvas || !ctx) return;
      particles = [];

      const offscreen = document.createElement("canvas");
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const octx = offscreen.getContext("2d")!;

      const fontSize = Math.min(canvas.width * 0.155, 200);
      octx.font = `300 ${fontSize}px "Inter", "Helvetica Neue", sans-serif`;
      octx.fillStyle = "white";
      octx.textAlign = "center";
      octx.textBaseline = "middle";

      const lines = ["MUKESH", "KUIRY"];
      const lineH = fontSize * 0.92;
      const totalH = (lines.length - 1) * lineH;
      lines.forEach((line, i) => {
        octx.fillText(line, canvas!.width / 2, canvas!.height / 2 - totalH / 2 + i * lineH);
      });

      const { data } = octx.getImageData(0, 0, canvas.width, canvas.height);
      const gap = 4;

      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const idx = (y * canvas.width + x) * 4;
          if (data[idx + 3] > 128) {
            const ox = x;
            const oy = y;
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              ox,
              oy,
              vx: 0,
              vy: 0,
              size: Math.random() * 1.4 + 0.6,
              alpha: Math.random() * 0.4 + 0.6,
            });
          }
        }
      }
    }

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      ctx!.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      createParticles();
    }

    function tick() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 6;
          p.vy -= Math.sin(angle) * force * 6;
        }

        // Spring back
        p.vx += (p.ox - p.x) * 0.09;
        p.vy += (p.oy - p.y) * 0.09;

        // Damping
        p.vx *= 0.86;
        p.vy *= 0.86;

        p.x += p.vx;
        p.y += p.vy;

        // Subtle idle drift
        const t = Date.now() / 2000;
        const drift = Math.sin(t + p.ox * 0.01) * 0.3;
        p.y += drift;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    resize();
    tick();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        width: "100%",
        height: "clamp(220px, 28vw, 520px)",
        display: "block",
        cursor: "none",
      }}
    />
  );
}
