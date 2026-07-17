import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { profile } from '@/lib/site-data'

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-5xl scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24"
    >
      <SectionHeading id="contact-heading" index="04" eyebrow="Contact" title="Let's work together." />

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <Reveal variant="right">
          <div>
            <p className="text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
              Have a project in mind, or just want to say hi?{' '}
              <span className="text-gradient">I&apos;m always happy to chat.</span>
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {profile.email}
              <ArrowUpRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>

        <Reveal variant="left" delay={0.08}>
          <nav aria-label="Social links">
            <ul className="flex flex-col">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-t border-border py-3 text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {social.label}
                    </span>
                    <ArrowUpRight
                      className="size-4 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </div>
    </section>
  )
}
