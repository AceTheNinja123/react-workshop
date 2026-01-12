import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact,
    },
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "react/react-in-jsx-scope": "off", // For Next.js
    },
  },
  ...tseslint.configs.recommended,
];

export default config;