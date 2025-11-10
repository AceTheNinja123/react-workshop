import type { NextConfig } from "next";
import "./src/env.js";
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.openai.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lexica.art',
      },
      {
        protocol: 'https',
        hostname: 'api-inference.huggingface.co',
      },
      {
        protocol: 'https',
        hostname: 'black-forest-labs-flux-1-dev.hf.space',
      },
    ],
  },
};
export default nextConfig;