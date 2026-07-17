'use client'

import { motion, useReducedMotion } from 'motion/react'

type SectionHeadingProps = {
  index: string
  eyebrow: string
  title: string
  id: string
}

export function SectionHeading({ index, eyebrow, title, id }: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="mb-10 flex flex-col gap-3 pb-6">
      <motion.span
        initial={shouldReduceMotion ? false : { opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
      >
        <span className="text-gradient font-semibold">{index}</span> — {eyebrow}
      </motion.span>

      <motion.h2
        id={id}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {title}
      </motion.h2>

      {/* Animated underline that draws in on scroll */}
      <div className="relative mt-2 h-px w-full bg-border">
        <motion.span
          aria-hidden="true"
          initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-accent absolute inset-y-0 left-0 w-32 origin-left"
        />
      </div>
    </div>
  )
}
