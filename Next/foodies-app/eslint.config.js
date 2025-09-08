import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  // Include recommended JavaScript rules
  js.configs.recommended,

  // Extend Next.js ESLint configuration
  ...compat.extends("next/core-web-vitals"),

  // Add Prettier configuration to avoid conflicts
  ...compat.extends("prettier"),

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Preserve your custom rule from the original config
      "@next/next/no-img-element": "off",

      // Prettier formatting as error
      "prettier/prettier": "error",

      // Additional helpful rules
      "no-unused-vars": "warn",
      "no-console": "warn",
      "prefer-const": "error",
    },
  },

  {
    files: ["**/*.config.{js,ts}", "**/next.config.js", "**/eslint.config.js"],
    languageOptions: {
      globals: {
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "writable",
        require: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "no-console": "off",
    },
  },
];
