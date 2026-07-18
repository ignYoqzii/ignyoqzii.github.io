"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/site-data";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.6 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    if (shouldReduceMotion || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top;

    rawX.set(offsetX * 0.15);
    rawY.set(offsetY * 0.08);
  }

  function handlePointerLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Soft spotlight glow behind the hero, drifts toward the cursor */}
      <motion.div
        aria-hidden="true"
        className="hero-spotlight pointer-events-none absolute left-1/2 top-[-10%] -z-10 h-130 w-205 max-w-[140vw]"
        style={{ x: springX, y: springY }}
        initial={{ opacity: shouldReduceMotion ? 0.65 : 0.5, scale: 1 }}
        animate={
          shouldReduceMotion
            ? undefined
            : { opacity: [0.5, 0.8, 0.5], scale: [1, 1.08, 1] }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 9, ease: "easeInOut", repeat: Infinity }
        }
        transformTemplate={(_, generated) => `translateX(-50%) ${generated}`}
      />

      {/* Floating gradient blobs */}
      <div
        aria-hidden="true"
        className="bg-gradient-accent animate-float-slow pointer-events-none absolute -left-24 top-24 -z-10 size-72 rounded-full opacity-20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="bg-gradient-accent animate-float-slower pointer-events-none absolute -right-16 top-48 -z-10 size-80 rounded-full opacity-15 blur-3xl"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-5xl px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24"
      >
        <motion.h1
          variants={item}
          id="hero-heading"
          className="text-balance text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl"
        >
          {"hi, i'm "}
          {profile.firstName}{" "}
          <motion.img
            src={profile.logo}
            alt=""
            aria-hidden="true"
            className="inline-block size-20 rounded-full"
            animate={
              shouldReduceMotion ? undefined : { rotate: [0, 14, -8, 14, 0] }
            }
            transition={{
              duration: 1.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 2.5,
            }}
            style={{ transformOrigin: "70% 70%" }}
          />
          <span className="text-gradient mt-3 block">{profile.tagline}</span>
        </motion.h1>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <motion.a
            href="#projects"
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            View my work
            <ArrowDownRight
              className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Get in touch
            <ArrowUpRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </motion.a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          variants={item}
          aria-hidden="true"
          className="mt-16 flex items-center gap-2 text-muted-foreground"
        >
          <motion.span
            animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
            className="inline-flex"
          >
            <ArrowDownRight className="size-4 rotate-45" />
          </motion.span>
          <span className="font-mono text-xs uppercase tracking-widest">
            Scroll to explore
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}