import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import i18nJson from 'eslint-plugin-i18n-json';
import jest from 'eslint-plugin-jest';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactNative from 'eslint-plugin-react-native';
import reactotron from 'eslint-plugin-reactotron';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import testingLibrary from 'eslint-plugin-testing-library';
import unicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default [
  // Global ignores
  {
    ignores: [
      'node_modules/',
      'build/',
      'dist/',
      'lib/',
      'scripts/',
      '*.config.js',
      'metro.config.js',
      'babel.config.js',
      'android/',
      'ios/',
      'coverage/',
      '.expo/',
      '.expo-shared',
      'web-build/',
      '.env',
      '.env.*',
      '__tests__/',
      '.vscode/',
      'docs/',
      'cli/',
      '**/*.d.ts',
      '.expo/**',
    ],
  },

  // Base JavaScript configuration
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-native': reactNative,
      prettier: prettier,
      unicorn: unicorn,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          endOfLine: 'auto',
        },
      ],
      'no-console': 2,
      'react-native/no-inline-styles': 'off',
      'max-lines-per-function': ['error', 200],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },

  // TypeScript configuration
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
        createDefaultProgram: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: react,
      'react-hooks': reactHooks,
      'react-native': reactNative,
      prettier: prettier,
      unicorn: unicorn,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      'react-compiler': reactCompiler,
      reactotron: reactotron,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          endOfLine: 'auto',
        },
      ],
      'react-native/no-inline-styles': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-console': 2,
      'max-lines-per-function': ['error', 200],
      'react/destructuring-assignment': 'off',
      'react/require-default-props': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      'import/prefer-default-export': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },

  // Testing files configuration
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    plugins: {
      'testing-library': testingLibrary,
      jest: jest,
    },
    rules: {
      ...testingLibrary.configs.react.rules,
      ...jest.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  // i18n JSON files configuration
  {
    files: ['src/translations/*.json'],
    ignores: ['src/translations/ar.json', 'src/translations/en.json'],
    plugins: {
      'i18n-json': i18nJson,
    },
    rules: {
      ...i18nJson.configs.recommended.rules,
      'i18n-json/sorted-keys': 'off',
      'i18n-json/identical-keys': 'off',
      'i18n-json/valid-message-syntax': [
        2,
        {
          syntax: './scripts/i18next-syntax-validation.js',
        },
      ],
      'i18n-json/valid-json': 2,
    },
  },
];
