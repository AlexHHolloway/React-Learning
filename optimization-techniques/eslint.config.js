import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

const compat = new FlatCompat();

export default [
  js.configs.recommended,
  ...compat.config({
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    extends: [
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
    ],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Not needed for React 17+
      'react/prop-types': 'off', // If not using prop-types
    },
  }),
];