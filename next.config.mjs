/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Compression ────────────────────────────────────────────────────────────
  // Enables Brotli/gzip text compression on responses (JS, CSS, HTML, JSON)
  compress: true,

  // Remove the X-Powered-By: Next.js header (minor security hardening)
  poweredByHeader: false,

  // ── Image Optimisation ─────────────────────────────────────────────────────
  // Serve AVIF first (smallest), fall back to WebP, then original format.
  // This is the primary lever for reducing image payload on the service showcase pages.
  images: {
    formats: ['image/avif', 'image/webp'],
    // Cache optimised images for 1 year (CDN-friendly)
    minimumCacheTTL: 31536000,
    // Allow Google favicon service and the site's own domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/favicons/**',
      },
    ],
    // Hint the image sizes used on the page so Next.js generates the right srcset breakpoints
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // ── HTTP Headers ───────────────────────────────────────────────────────────
  // Applied via middleware-level headers for production (Vercel / Node server).
  async headers() {
    return [
      {
        // Match all routes
        source: '/(.*)',
        headers: [
          // Tell Google to crawl and index, but not use the page for training if you prefer:
          // (We WANT Google-Extended to crawl, so we do NOT add X-Robots-Tag: noai here)
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // Public folder assets — images, videos, sitemap.xml, robots.txt, llms.txt
        // (/_next/static is intentionally omitted — Next.js manages that header internally)
        source: '/(.*\\.(?:jpg|jpeg|png|gif|webp|avif|mp4|svg|ico|txt|xml))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
