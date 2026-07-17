import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getCliValue(flags) {
  const args = process.argv.slice(2);

  for (let i = 0; i < args.length; i += 1) {
    if (flags.includes(args[i])) return args[i + 1];

    const match = flags.find((flag) => args[i].startsWith(`${flag}=`));
    if (match) return args[i].slice(match.length + 1);
  }

  return undefined;
}

const requestedPort = process.env.PORT || getCliValue(["-p", "--port"]);
const distDir =
  process.env.NEXT_DIST_DIR || (requestedPort === "3200"
    ? ".next-preview"
    : ".next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the workspace root to this project. Without this, a stray
  // package-lock.json in a parent folder makes Next guess the wrong root.
  outputFileTracingRoot: __dirname,
  // Separate build dir per server so a second dev instance (e.g. Claude's
  // preview on :3200) never corrupts the main one's .next cache.
  distDir,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
