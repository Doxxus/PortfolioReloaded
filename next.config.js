/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

const BASE_PATH = "/portfolio";

/** @type {import("next").NextConfig} */
const config = {
  basePath: BASE_PATH,
  env: { NEXT_PUBLIC_BASE_PATH: BASE_PATH },
  async redirects() {
    // Requests proxied by doxxus.ca arrive with the *.vercel.app host, so only direct visits to the old subdomain match.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "folio.doxxus.ca" }],
        destination: `https://doxxus.ca${BASE_PATH}/:path*`,
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default config;
