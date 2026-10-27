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
  floatDelay?: number;
}

function DraggableHoloShape(props: DraggableShapeProps) {
  const { src, className, initialRotate, floatDelay = 0 } = props;

  return (
    <motion.div
      className={`majd-holo-shape ${className}`}
      drag
      dragMomentum={true}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 28 }}
      initial={{ opacity: 0.001, y: 14, rotate: initialRotate - 8, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, rotate: initialRotate, scale: 1 }}
      transition={{
        duration: 0.9,
        delay: 0.35 + floatDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.06, rotate: initialRotate + 6 }}
      whileTap={{ cursor: "grabbing", scale: 0.95 }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <motion.div
        animate={{ y: [0, -7, 0], rotate: [0, 3, 0] }}
        transition={{
          duration: 4.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        style={{ width: "100%", height: "100%" }}
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
    </motion.div>
  );
}

export function HeroBioSection() {
  const bioSectionRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const [mobileFlipped, setMobileFlipped] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1100);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMobileFlipped(true);
    }, 1350);
    return () => window.clearTimeout(timer);
  }, []);

  // Exact Framer scroll transform targeting Bio Section (ref1 in XQuJCztg5.js)
  const { scrollYProgress } = useScroll({
    target: bioSectionRef,
    offset: ["start end", "end end"],
  });

  // Tuned spring for buttery 120fps scroll-linked 3D flip
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 380,
    damping: 46,
    mass: 0.8,
  });

  const desktopScale = useTransform(smoothProgress, [0, 1], [0.52, 1]);
  const desktopY = useTransform(smoothProgress, [0, 1], [104, 0]);
  const desktopRotateYFront = useTransform(smoothProgress, [0, 1], [0, 180]);
  const desktopRotateYBack = useTransform(smoothProgress, [0, 1], [-180, 0]);

  return (
    <div className="majd-hero-bio-wrapper">
      {/* Sticky Avatar Wrap (200vh track on Desktop >=1100px) */}
      {isDesktop && (
        <div className="majd-sticky-avatar-track">
          <div className="majd-sticky-avatar-viewport">
            <motion.div
              className="majd-avatar-card"
              initial={{ opacity: 0.001, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Desktop Scroll-Linked Back Face (Full-Color Studio Portrait) */}
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
                  alt="Portrait of Mukesh Kuiry – color view"
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
                  alt="Portrait of Mukesh Kuiry – monochrome view"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Foreground Content: Hero Section + Bio Section */}
      <div className="majd-hero-bio-content">
        {/* HERO SECTION */}
        <section id="hero-section" className="majd-hero-section">
          <div className="majd-hero-container">
            <div className="majd-hero-title-wrap">
              <DraggableHoloShape
                src="/images/holo-triangle-2.png"
                className="majd-holo-tl"
                initialRotate={0}
                floatDelay={0}
              />
              <DraggableHoloShape
                src="/images/holo-triangle-1.png"
                className="majd-holo-br"
                initialRotate={16}
                floatDelay={0.35}
              />
              <WordReveal
                text={PROFILE.role}
                as="h1"
                className="majd-h1-hero"
                trigger="mount"
                blurPx={4}
                duration={0.95}
                startDelay={0.08}
                staggerDelay={0.08}
              />
            </div>

            {/* Mobile & Tablet Interactive 3D Flip Portrait (cleanly in flow, zero overlap) */}
            {!isDesktop && (
              <motion.div
                className="majd-mobile-avatar-stage"
                initial={{ opacity: 0, y: 18, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.75,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div
                  className="majd-avatar-card majd-avatar-card-mobile"
                  onClick={() => setMobileFlipped((prev) => !prev)}
                  role="button"
                  tabIndex={0}
                  aria-label="Flip portrait"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setMobileFlipped((prev) => !prev);
                    }
                  }}
                >
                  <motion.div
                    className="majd-avatar-face"
                    initial={false}
                    animate={{
                      rotateY: mobileFlipped ? 0 : -180,
                      transformPerspective: 1200,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 22,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={PROFILE.avatarBack}
                      alt="Portrait of Mukesh Kuiry – color view"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </motion.div>

                  <motion.div
                    className="majd-avatar-face"
                    initial={false}
                    animate={{
                      rotateY: mobileFlipped ? 180 : 0,
                      transformPerspective: 1200,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 22,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={PROFILE.avatarFront}
                      alt="Portrait of Mukesh Kuiry – monochrome view"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}

            <motion.div
              className="majd-hero-bottom-bar"
              initial={{ opacity: 0.001, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h2 className="majd-h2-hero-year">
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
            <motion.div
              className="majd-bio-left"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <WordReveal
                text={PROFILE.bioHeading}
                as="h2"
                className="majd-h2-section"
                trigger="inView"
                blurPx={6}
                duration={0.9}
              />
              <p className="majd-p-lead" style={{ color: "#111111" }}>
                {PROFILE.bioLead}
              </p>
            </motion.div>

            <motion.div
              className="majd-bio-right"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
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
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
