import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { projects } from '@/lib/site-data'

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto max-w-5xl scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24"
    >
      <SectionHeading id="projects-heading" index="03" eyebrow="Projects" title="Selected work." />

      <ul className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal as="li" variant={i % 2 === 0 ? 'scale' : 'blur'} key={project.title} delay={(i % 2) * 0.08}>
            <a
              href={project.href}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl hover:shadow-black/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-secondary">
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt={`Preview of the ${project.title} project`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Accent sweep on hover */}
                <span
                  aria-hidden="true"
                  className="bg-gradient-accent pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-30"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="flex items-center gap-1.5 text-lg font-medium tracking-tight">
                    {project.title}
                    <ArrowUpRight
                      className="size-4 text-muted-foreground transition-colors group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
                </div>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{project.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
