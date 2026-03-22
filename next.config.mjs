/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/cv',
  // trailingSlash intentionally omitted — all navigation is anchor-based (#section-id).
  // Revisit if adding new routes in future.
  images: {
    unoptimized: true,
  },
}

export default nextConfig
