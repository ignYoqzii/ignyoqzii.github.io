import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { about } from '@/lib/site-data'

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-5xl scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24"
    >
      <SectionHeading id="about-heading" index="01" eyebrow="About me" title="A gamer who builds." />

      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Reveal variant="right">
            <p className="text-pretty text-xl leading-relaxed sm:text-2xl">{about.intro}</p>
          </Reveal>
          <Reveal variant="right" delay={0.05}>
            <p className="text-pretty leading-relaxed text-muted-foreground">{about.details}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="flex flex-wrap gap-2 pt-2">
              {about.skills.map((skill) => (
                <li
                  key={skill}
                  className="cursor-default rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal variant="left" delay={0.1}>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {about.facts.map((fact) => (
              <div
                key={fact.label}
                className="group bg-card p-5 transition-colors duration-200 hover:bg-secondary"
              >
                <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{fact.label}</dt>
                <dd className="mt-2 text-lg font-medium tracking-tight transition-colors group-hover:text-accent">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
