"use client";

import { TextArrowButton } from "@/components/TextArrowButton";
import { PROFILE } from "@/lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

gsap.registerPlugin(ScrollTrigger);

interface DraggableShapeProps {
  src: string;
  className: string;
  initialRotate: number;
}

function DraggableHoloShape(props: DraggableShapeProps) {
  const { src, className, initialRotate } = props;
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragState = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  }>({
    dragging: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      dragging: true,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.dragging) return;
    const dx = event.clientX - dragState.current.startX;
    const dy = event.clientY - dragState.current.startY;
    setOffset({
      x: dragState.current.originX + dx,
      y: dragState.current.originY + dy,
    });
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState.current.dragging) return;
    dragState.current.dragging = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      className={`majd-holo-shape ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0) rotate(${initialRotate}deg)`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />
    </div>
  );
}

export function HeroBioSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bioSectionRef = useRef<HTMLElement>(null);
  const avatarCardRef = useRef<HTMLDivElement>(null);
  const avatarFrontRef = useRef<HTMLDivElement>(null);
  const avatarBackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bioEl = bioSectionRef.current;
    const cardEl = avatarCardRef.current;
    const frontEl = avatarFrontRef.current;
    const backEl = avatarBackRef.current;
    if (!bioEl || !cardEl || !frontEl || !backEl) return;

    const mm = gsap.matchMedia();

    // Desktop (>=1280px): Exact Framer scroll-linked 3D flip & scale
    // Hero state: scale: 0.5, y: 114, rotateY: 0 (grayscale front visible)
    // Bio state: scale: 1.0, y: 0, rotateY: 180 (full-color back visible)
    mm.add("(min-width: 1280px)", () => {
      gsap.set(cardEl, {
        scale: 0.5,
        y: 114,
        rotateY: 0,
        transformPerspective: 1200,
      });

      const tween = gsap.to(cardEl, {
        scale: 1,
        y: 0,
        rotateY: 180,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: bioEl,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      return () => {
        tween.kill();
      };
    });

    // Tablet & Phone (<1280px): Automatic 2s delayed 3D flip on mount (matching animation2/animation4)
    mm.add("(max-width: 1279.98px)", () => {
      gsap.set(cardEl, {
        scale: 1,
        y: 0,
        rotateY: 0,
        transformPerspective: 1200,
      });

      const tween = gsap.to(cardEl, {
        rotateY: 180,
        duration: 1.6,
        delay: 1.4,
        ease: "power3.out",
      });

      return () => {
        tween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div className="majd-hero-bio-wrapper" ref={wrapperRef}>
      {/* Sticky Avatar Wrap (200vh track on Desktop) */}
      <div className="majd-sticky-avatar-track">
        <div className="majd-sticky-avatar-viewport">
          <div className="majd-avatar-card" ref={avatarCardRef}>
            {/* Front Face: Grayscale Portrait (Initial in Hero) */}
            <div className="majd-avatar-face majd-avatar-front" ref={avatarFrontRef}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROFILE.avatarFront}
                alt="Portrait of Mukesh Kuiry – grayscale view"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>

            {/* Back Face: Full-Color Warm Portrait (Revealed on 180deg Y-Flip in Bio) */}
            <div
              className="majd-avatar-face majd-avatar-back"
              ref={avatarBackRef}
              style={{
                background:
                  "linear-gradient(145deg, #f97316 0%, #ea580c 45%, #111111 100%)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROFILE.avatarBack}
                alt="Portrait of Mukesh Kuiry – full color view"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  mixBlendMode: "normal",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Foreground Content: Hero Section (100vh) + Bio Section (100vh) */}
      <div className="majd-hero-bio-content">
        {/* HERO SECTION */}
        <section id="hero-section" className="majd-hero-section">
          <div className="majd-hero-container">
            <div className="majd-hero-title-wrap">
              <DraggableHoloShape
                src="/images/holo-triangle-2.png"
                className="majd-holo-tl"
                initialRotate={0}
              />
              <DraggableHoloShape
                src="/images/holo-triangle-1.png"
                className="majd-holo-br"
                initialRotate={16}
              />
              <h1 className="majd-h1-hero">{PROFILE.role}</h1>
            </div>

            <div className="majd-hero-bottom-bar">
              <h2 className="majd-h2-hero-year majd-hero-year-hide-mobile">
                <mark>{PROFILE.yearBadge}</mark>
              </h2>
              <p className="majd-p-body">
                <mark>{PROFILE.sinceBadge}</mark>
              </p>
            </div>
          </div>
        </section>

        {/* BIO / ABOUT ME SECTION */}
        <section
          id="bio-section"
          className="majd-bio-section"
          ref={bioSectionRef}
        >
          <div className="majd-bio-container">
            <div className="majd-bio-left">
              <h2 className="majd-h2-section">{PROFILE.bioHeading}</h2>
              <p className="majd-p-lead" style={{ color: "#111111" }}>
                {PROFILE.bioLead}
              </p>
            </div>

            <div className="majd-bio-right">
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {PROFILE.bioParagraphs.map((paragraph, index) => (
                  <p key={index} className="majd-p-body" style={{ color: "#111111" }}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  marginTop: "4px",
                }}
              >
                {PROFILE.skills.slice(0, 9).map((skill) => (
                  <span key={skill} className="majd-pill-badge">
                    {skill}
                  </span>
                ))}
              </div>

              <TextArrowButton
                title="Get Started"
                href="/#contact"
                variant="primary"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
