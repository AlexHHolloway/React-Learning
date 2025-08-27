import reactPlugin from "eslint-plugin-react";
import babelParser from "@babel/eslint-parser";

export default [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-vars": "error",
      "react/jsx-no-undef": "error",
    },
  },
];
