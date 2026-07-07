import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to this project. Without this, a stray
  // package-lock.json in a parent folder makes Next guess the wrong root.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
