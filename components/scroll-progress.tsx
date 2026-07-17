'use client'

import { motion, useScroll, useSpring } from 'motion/react'

/**
 * A thin gradient bar pinned to the top of the viewport that fills as the
 * user scrolls the page. Purely decorative.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-gradient-accent fixed inset-x-0 top-0 z-60 h-1 origin-left"
    />
  )
}
