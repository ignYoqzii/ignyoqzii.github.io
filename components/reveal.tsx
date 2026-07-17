'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur'

type RevealProps = {
  children: ReactNode
  /** Delay in seconds before the animation starts. */
  delay?: number
  className?: string
  /** Render as a different element (defaults to a div). */
  as?: 'div' | 'li' | 'section' | 'article'
  /** Entrance style. Defaults to a subtle fade + lift. */
  variant?: RevealVariant
}

const OFFSETS: Record<RevealVariant, { x?: number; y?: number; scale?: number; filter?: string }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 40 },
  right: { x: -40 },
  scale: { scale: 0.92 },
  blur: { y: 16, filter: 'blur(12px)' },
}

/**
 * Fades its children into view once when scrolled into the viewport, with a
 * choice of directional / scale / blur entrances for variety.
 * Respects `prefers-reduced-motion` by rendering statically.
 */
export function Reveal({ children, delay = 0, className, as = 'div', variant = 'up' }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const MotionTag = motion[as]

  if (shouldReduceMotion) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const offset = OFFSETS[variant]

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </MotionTag>
  )
}
