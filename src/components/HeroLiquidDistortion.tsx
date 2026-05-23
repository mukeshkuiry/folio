"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uIntensity;
  uniform sampler2D uTexture;
  varying vec2 vUv;

  // Simplex-like noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    
    // Distance from mouse
    vec2 mouseUV = uMouse;
    float dist = distance(uv, mouseUV);
    
    // Gentle ripple based on mouse proximity
    float ripple = smoothstep(0.35, 0.0, dist);
    
    // Soft wavy distortion
    float noise1 = snoise(uv * 2.5 + uTime * 0.15) * 0.4;
    float noise2 = snoise(uv * 3.5 - uTime * 0.1) * 0.25;
    
    // Subtle mouse-driven distortion
    vec2 distortion = vec2(
      sin(uv.y * 8.0 + uTime * 0.6 + noise1) * ripple * uIntensity * 0.025,
      cos(uv.x * 8.0 + uTime * 0.6 + noise2) * ripple * uIntensity * 0.018
    );
    
    // Very gentle ambient wave
    distortion += vec2(
      snoise(uv * 1.5 + uTime * 0.08) * 0.001,
      snoise(uv * 1.8 - uTime * 0.06) * 0.001
    );
    
    vec2 distortedUV = uv + distortion;
    vec4 color = texture2D(uTexture, distortedUV);
    
    // Very subtle chromatic aberration
    float r = texture2D(uTexture, distortedUV + distortion * 0.15).r;
    float g = texture2D(uTexture, distortedUV).g;
    float b = texture2D(uTexture, distortedUV - distortion * 0.15).b;
    
    gl_FragColor = vec4(r, g, b, color.a);
  }
`;

export function HeroLiquidDistortion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Create a canvas texture from the text behind
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const w = container.offsetWidth * 2;
    const h = container.offsetHeight * 2;
    canvas.width = w;
    canvas.height = h;

    function renderTextToCanvas() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#EBEBEB";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#1A1A1A";
      ctx.textBaseline = "top";
      ctx.textAlign = "left";

      const lines = ["software", "engineering", "focused on scale", "and clean execution."];
      // Match .t-hero exactly: clamp(40px, 10vw, 200px), weight 300, line-height 0.95em, letter-spacing -0.02em
      const cw = container?.offsetWidth ?? window.innerWidth;
      const cssPx = Math.min(Math.max(40, cw * 0.10), 200);
      const fontSize = cssPx * 2;
      ctx.font = `300 ${fontSize}px Inter, "Helvetica Neue", Helvetica, sans-serif`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ctx as any).letterSpacing = `${-0.02 * fontSize}px`;

      const lineHeight = fontSize * 0.95;
      lines.forEach((line: string, i: number) => {
        ctx.fillText(line, 0, i * lineHeight);
      });
    }

    renderTextToCanvas();
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(container.offsetWidth, container.offsetHeight) },
      uIntensity: { value: 1.0 },
      uTexture: { value: texture },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseRef.current.x = (e.clientX - rect.left) / rect.width;
      targetMouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    const onResize = () => {
      const cw = container.offsetWidth;
      const ch = container.offsetHeight;
      renderer.setSize(cw, ch);
      uniforms.uResolution.value.set(cw, ch);
      canvas.width = cw * 2;
      canvas.height = ch * 2;
      renderTextToCanvas();
      texture.needsUpdate = true;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    const startTime = performance.now();
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) / 1000;
      uniforms.uTime.value = elapsed;

      // Smooth lerp mouse
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;
      uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 1,
        zIndex: 2,
        pointerEvents: "auto",
      }}
    />
  );
}
