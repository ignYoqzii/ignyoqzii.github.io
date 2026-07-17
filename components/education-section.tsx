import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { education } from "@/lib/site-data";

export function EducationSection() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="mx-auto max-w-5xl scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24"
    >
      <SectionHeading
        id="education-heading"
        index="02"
        eyebrow="Education"
        title="Where I studied."
      />

      <ol className="flex flex-col">
        {education.map((item, i) => (
          <Reveal as="li" variant="left" key={item.school} delay={i * 0.08}>
            <div className="group relative grid gap-2 border-t border-border py-6 pl-4 transition-colors duration-200 hover:bg-secondary/50 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:py-8">
              {/* Accent bar that grows on hover */}
              <span
                aria-hidden="true"
                className="bg-gradient-accent absolute left-0 top-1/2 h-0 w-0.5 -translate-y-1/2 rounded-full transition-all duration-300 group-hover:h-3/4"
              />
              <p className="font-mono text-sm text-muted-foreground">
                {item.period}
              </p>
              <div>
                <h3 className="text-lg font-medium tracking-tight transition-transform duration-200 group-hover:translate-x-1 sm:text-xl">
                  {item.school}
                </h3>
                <p className="mt-1 text-accent">{item.degree}</p>
                <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
