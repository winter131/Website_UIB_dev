import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        "tiptap": "@tiptap",
      },
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "tiptap": "@tiptap",
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: '/news',
        destination: '/berita',
        permanent: false,
      },
      {
        source: '/article',
        destination: '/berita',
        permanent: false,
      },
      {
        source: '/news/create',
        destination: '/berita/buat',
        permanent: false,
      },
      {
        source: '/news/edit/:id',
        destination: '/berita/edit/:id',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
