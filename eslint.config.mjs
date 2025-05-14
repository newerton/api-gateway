import importPlugin from 'eslint-plugin-import';
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'pm2.config.js'],
  },
  {
    plugins: {
      "unused-imports": unusedImports,
    }
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  importPlugin.flatConfigs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
  },

  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',

      "sort-imports": ["error", {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: true,
      }],

      "import/no-unresolved": "error",
      "unused-imports/no-unused-imports": "error",

      "import/order": ["error", {
        groups: [
          "builtin",
          "external",
          "internal",
          ["sibling", "parent"],
          "index",
          "unknown",
        ],

        "newlines-between": "always",

        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      }],

    },

    settings: {
      "import/resolver": {
        typescript: {
          project: import.meta.dirname + '/tsconfig.json',
        },
      },
    },
  },
);
