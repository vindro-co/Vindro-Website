/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        /**
         * Next serves prerendered HTML with `s-maxage=31536000,
         * stale-while-revalidate` — a year of shared-cache life — on the
         * assumption the host purges its CDN on every deploy. Hostinger does
         * not, so caches kept handing out old HTML that referenced hashed
         * chunks the redeploy had already deleted. The result was a 404 on
         * /_next/static/..., then ChunkLoadError, then React #423 and a blank
         * "Application error" page for anyone who had visited before.
         *
         * Forcing the document to revalidate costs one conditional request
         * (it still 304s via ETag) and makes a deploy visible immediately.
         *
         * The negative lookahead is load-bearing: /_next/static/* must keep
         * its immutable year-long caching, since those filenames are hashed.
         */
        source: "/((?!_next/static|_next/image).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
