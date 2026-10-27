"use client";

import { TextArrowButton } from "@/components/TextArrowButton";
import { WordReveal } from "@/components/WordReveal";
import { PROFILE } from "@/lib/data";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface DraggableShapeProps {
  src: string;
  className: string;
  initialRotate: number;
}

function DraggableHoloShape(props: DraggableShapeProps) {
  const { src, className, initialRotate } = props;

  return (
    <motion.div
      className={`majd-holo-shape ${className}`}
      drag
      dragMomentum={true}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }}
      initial={{ opacity: 0.001, y: 10, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: initialRotate }}
      transition={{
        type: "spring",
        bounce: 0,
        delay: 1.4,
        duration: 1.6,
      }}
      whileTap={{ cursor: "grabbing", scale: 0.96 }}
      onMouseDown={(e) => e.preventDefault()}
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
    </motion.div>
  );
}

export function HeroBioSection() {
  const bioSectionRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Exact Framer scroll transform targeting Bio Section (ref1 in XQuJCztg5.js)
  const { scrollYProgress } = useScroll({
    target: bioSectionRef,
    offset: ["start end", "end end"],
  });

  // Exact Framer spring: { bounce: 0, damping: 60, mass: 1, stiffness: 500 }
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 500,
    damping: 60,
    mass: 1,
  });

  const desktopScale = useTransform(smoothProgress, [0, 1], [0.5, 1]);
  const desktopY = useTransform(smoothProgress, [0, 1], [114, 0]);
  const desktopRotateYFront = useTransform(smoothProgress, [0, 1], [0, 180]);
  const desktopRotateYBack = useTransform(smoothProgress, [0, 1], [-180, 0]);

  return (
    <div className="majd-hero-bio-wrapper">
      {/* Sticky Avatar Wrap (200vh track on Desktop) */}
      <div className="majd-sticky-avatar-track">
        <div className="majd-sticky-avatar-viewport">
          <motion.div
            className="majd-avatar-card"
            initial={{ opacity: 0.001, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              bounce: 0,
              delay: 1,
              duration: 1.6,
            }}
          >
            {isDesktop ? (
              <>
                {/* Desktop Scroll-Linked Back Face (Crimson-Red Studio Portrait) */}
                <motion.div
                  className="majd-avatar-face"
                  style={{
                    scale: desktopScale,
                    y: desktopY,
                    rotateY: desktopRotateYBack,
                    transformPerspective: 1200,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PROFILE.avatarBack}
                    alt="Portrait of portfolio creator – back view"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </motion.div>

                {/* Desktop Scroll-Linked Front Face (Grayscale Studio Portrait) */}
                <motion.div
                  className="majd-avatar-face"
                  style={{
                    scale: desktopScale,
                    y: desktopY,
                    rotateY: desktopRotateYFront,
                    transformPerspective: 1200,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PROFILE.avatarFront}
                    alt="Portrait of portfolio creator – front view"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </motion.div>
              </>
            ) : (
              <>
                {/* Tablet/Phone Delayed Mount Flip Back Face (animation2/animation3 in XQuJCztg5.js) */}
                <motion.div
                  className="majd-avatar-face"
                  initial={{ rotateY: -180, transformPerspective: 1200 }}
                  animate={{ rotateY: 0, transformPerspective: 1200 }}
                  transition={{
                    type: "spring",
                    bounce: 0,
                    delay: 2,
                    duration: 1.6,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PROFILE.avatarBack}
                    alt="Portrait of portfolio creator – back view"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </motion.div>

                {/* Tablet/Phone Delayed Mount Flip Front Face (animation4/animation5 in XQuJCztg5.js) */}
                <motion.div
                  className="majd-avatar-face"
                  initial={{ rotateY: 0, transformPerspective: 1200 }}
                  animate={{ rotateY: 180, transformPerspective: 1200 }}
                  transition={{
                    type: "spring",
                    bounce: 0,
                    delay: 2,
                    duration: 1.6,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PROFILE.avatarFront}
                    alt="Portrait of portfolio creator – front view"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </motion.div>
              </>
            )}
          </motion.div>
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
              <WordReveal
                text={PROFILE.role}
                as="h1"
                className="majd-h1-hero"
                trigger="mount"
                blurPx={2}
                duration={2.8}
                startDelay={0.25}
                staggerDelay={0.12}
              />
            </div>

            <motion.div
              className="majd-hero-bottom-bar"
              initial={{ opacity: 0.001, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                bounce: 0,
                delay: 1.4,
                duration: 1.6,
              }}
            >
              <h2 className="majd-h2-hero-year majd-hero-year-hide-mobile">
                <mark>{PROFILE.yearBadge}</mark>
              </h2>
              <p className="majd-p-body">
                <mark>{PROFILE.sinceBadge}</mark>
              </p>
            </motion.div>
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
              <WordReveal
                text={PROFILE.bioHeading}
                as="h2"
                className="majd-h2-section"
                trigger="inView"
                blurPx={10}
                duration={1.8}
              />
              <p className="majd-p-lead" style={{ color: "#111111" }}>
                {PROFILE.bioLead}
              </p>
            </div>

            <div className="majd-bio-right">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {PROFILE.bioParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="majd-p-body"
                    style={{ color: "#111111" }}
                  >
                    {paragraph}
                  </p>
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
