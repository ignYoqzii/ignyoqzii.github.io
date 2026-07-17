import { profile } from '@/lib/site-data'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p>
          <a
            href="#top"
            className="rounded-md transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Back to top ↑
          </a>
        </p>
      </div>
    </footer>
  )
}
