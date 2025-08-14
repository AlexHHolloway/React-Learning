import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11YPlugin from "eslint-plugin-jsx-a11y";
import globals from "globals";

export default defineConfig([
  // Apply core JS recommended rules
  js.configs.recommended,

  {
    // Ensure these apply to relevant JavaScript/JSX/TSX files
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],

    // Plugins setup
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11YPlugin,
    },

    extends: [
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/recommended",
    ],

    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      // Turn off react import requirement for JSX runtime
      "react/react-in-jsx-scope": "off",
      // You can add other custom rules here
    },
  },

  {
    // Exclude ignored files (mimics .eslintignore)
    ignores: ["node_modules/**", "dist/**"],
  },
]);