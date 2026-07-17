'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Avoid a hydration mismatch: only render themed state after mount.
  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} mode` : 'Toggle theme'}
      className="relative inline-flex size-9 items-center justify-center overflow-hidden rounded-full border border-border text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={mounted && isDark ? 'moon' : 'sun'}
          initial={shouldReduceMotion ? false : { y: -18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: 18, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {mounted && isDark ? (
            <Moon className="size-4.5" aria-hidden="true" />
          ) : (
            <Sun className="size-4.5" aria-hidden="true" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
