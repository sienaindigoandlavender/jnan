import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Room content is read from disk at runtime; ship it with every server function.
  outputFileTracingIncludes: { "/**": ["./content/**/*"] },
};

export default nextConfig;
