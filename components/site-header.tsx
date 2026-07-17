"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/site-data";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={shouldReduceMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-2 rounded-md text-sm font-medium tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <img
            src={profile.logo}
            alt={profile.name}
            className="size-8 rounded-full"
          />
          <span className="font-semibold">{profile.name}</span>
          <span className="ml-2 hidden text-muted-foreground sm:inline">
            {profile.role}
          </span>
        </a>

        <div className="flex items-center gap-2">
          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex items-center justify-center rounded-full p-2 text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-border/60 sm:hidden"
        >
          <ul className="mx-auto flex max-w-5xl flex-col px-5 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-3 text-base text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </motion.header>
  );
}
