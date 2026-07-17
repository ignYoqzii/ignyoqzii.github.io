import { ScrollProgress } from '@/components/scroll-progress'
import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { EducationSection } from '@/components/education-section'
import { ProjectsSection } from '@/components/projects-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <SiteHeader />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
