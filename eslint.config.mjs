import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

/**
 * ESLint flat config (ESLint 9).
 *
 * The repo had `eslint` and `eslint-config-next` installed but no config file,
 * so `npm run lint` dropped into an interactive setup prompt and nothing was
 * ever linted — `tsc --noEmit` was the only automated check. `next lint` is
 * deprecated in Next 16, so the script calls the ESLint CLI directly.
 *
 * `next/core-web-vitals` carries the accessibility and image rules that matter
 * most here: a marketing site lives or dies on alt text, heading order, and
 * not shipping raw <img> where next/image belongs.
 */
const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".next-preview/**",
      "node_modules/**",
      "out/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
