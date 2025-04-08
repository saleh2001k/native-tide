const path = require('path');

module.exports = {
  // Configuration for JavaScript files
  extends: [
    '@react-native-community',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'eslint:recommended',
  ],
  plugins: ['unicorn'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
    'no-console': 2,
  },
  overrides: [
    // Configuration for TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['@typescript-eslint', 'unused-imports', 'simple-import-sort'],
      extends: ['@react-native-community', 'plugin:prettier/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        createDefaultProgram: true,
      },
      rules: {
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            endOfLine: 'auto',
          },
        ],
        'react-native/no-inline-styles': 'off',
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
    // Configuration for JavaScript files
    {
      files: ['**/*.js', '**/*.jsx'],
      plugins: ['unused-imports', 'simple-import-sort'],
      extends: ['@react-native-community', 'plugin:prettier/recommended'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            endOfLine: 'auto',
          },
        ],
        'react-native/no-inline-styles': 'off',
        'no-console': 2,
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
    // Configuration for translations files (i18next)
    {
      files: ['src/translations/*.json'],
      excludedFiles: ['src/translations/ar.json', 'src/translations/en.json'],
      extends: ['plugin:i18n-json/recommended'],
      rules: {
        // Ignoring i18n-json sorting and identical-keys errors
        'i18n-json/sorted-keys': 'off',
        'i18n-json/identical-keys': 'off',
        'i18n-json/valid-message-syntax': [
          2,
          {
            syntax: path.resolve('./scripts/i18next-syntax-validation.js'),
          },
        ],
        'i18n-json/valid-json': 2,
        // 'i18n-json/sorted-keys': [
        //   2,
        //   {
        //     order: 'asc',
        //     indentSpaces: 2,
        //   },
        // ],
      },
    },
    // Configuration for testing files
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
      plugins: ['jest'],
      env: {
        'jest/globals': true,
      },
    },
  ],
  ignorePatterns: ['**/*.d.ts'],
};
