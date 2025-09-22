import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";

export default tseslint.config(
  {
    ignores: [".netlify/", "dist/", "client/dist/", "dev-local.js", "postcss.config.js", "tailwind.config.ts", "drizzle.config.ts", "vite.config.ts"],
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react": reactPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
        ...tseslint.configs.recommended.rules,
        ...reactPlugin.configs.recommended.rules,
        ...reactPlugin.configs['jsx-runtime'].rules,
        'react/prop-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^', 'caughtErrorsIgnorePattern': '^' }],
    },
    settings: {
        react: {
            version: 'detect',
        },
    }
  }
);