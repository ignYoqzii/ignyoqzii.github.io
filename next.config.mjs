/** @type {import('next').NextConfig} */

// For GitHub Pages "project" sites the app is served from
// https://<user>.github.io/<repo>, so it needs a basePath.
// Set NEXT_PUBLIC_BASE_PATH to "/<repo>" in the GitHub Actions build
// (leave empty for a user/org root site or local dev).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig = {
  // Emit a fully static site into `out/` for GitHub Pages.
  output: 'export',
  // GitHub Pages serves each route as a folder with index.html.
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Required: GitHub Pages has no Next.js image optimization server.
    unoptimized: true,
  },
}

export default nextConfig
