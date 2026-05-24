"use client";
import { useEffect, useRef, memo } from "react";
import * as THREE from "three";
import { useDevice } from "@/hooks/useDevice";

interface Props {
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uHover;
  uniform vec2 uMouse;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 mouse = uMouse;
    float dist = length(vUv - mouse);
    float ripple = sin(dist * 40.0 - uHover * 6.0) * 0.04 * uHover;
    vec2 distortedUv = vUv + normalize(vUv - mouse + 0.001) * ripple;

    // Subtle animated grid lines
    float timeShift = uTime * 0.3;
    float grid = 0.0;
    grid += smoothstep(0.48, 0.5, mod(distortedUv.x * 10.0 + timeShift, 1.0));
    grid += smoothstep(0.48, 0.5, mod(distortedUv.y * 10.0, 1.0));
    grid = clamp(grid, 0.0, 1.0) * 0.06;

    // Subtle gradient overlay
    float vignette = 1.0 - smoothstep(0.3, 1.2, length(vUv - 0.5));
    
    vec3 col = uColor + grid * 0.5 + vignette * 0.02;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function hexToRGB(hex: string): THREE.Color {
  return new THREE.Color(hex);
}

export const WebGLImage = memo(function WebGLImage({ color = "#C8C4BD", className, style }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const device = useDevice();

  useEffect(() => {
    if (device === "m") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "low-power" });
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const col = hexToRGB(color);
    const uniforms = {
      uColor: { value: new THREE.Vector3(col.r, col.g, col.b) },
      uHover: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
    };
    const material = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms });
    scene.add(new THREE.Mesh(geometry, material));

    let animId: number;
    let targetHover = 0;
    let currentHover = 0;
    let targetMx = 0.5, targetMy = 0.5;
    let isVisible = false;
    const startTime = performance.now();

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Only render when visible (IntersectionObserver for performance)
    const io = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { threshold: 0.05 });
    io.observe(canvas);

    const onEnter = () => { targetHover = 1; };
    const onLeave = () => { targetHover = 0; };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMx = (e.clientX - rect.left) / rect.width;
      targetMy = 1 - (e.clientY - rect.top) / rect.height;
    };

    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("mousemove", onMove);

    function render() {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;
      
      currentHover += (targetHover - currentHover) * 0.06;
      uniforms.uHover.value = currentHover;
      uniforms.uMouse.value.x += (targetMx - uniforms.uMouse.value.x) * 0.08;
      uniforms.uMouse.value.y += (targetMy - uniforms.uMouse.value.y) * 0.08;
      uniforms.uTime.value = (performance.now() - startTime) / 1000;
      renderer.render(scene, camera);
    }
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("mousemove", onMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [color, device]);

  if (device === "m") {
    return (
      <div
        className={className}
        style={{ width: "100%", height: "100%", background: color, ...style }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block", ...style }}
    />
  );
});
