module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // Added node environment
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier', // Disable ESLint formatting rules
  ],
  overrides: [
    {
      files: ['.eslintrc.{js,cjs}'], // Removed env, parserOptions
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser', // Removed from root
  parserOptions: {
    ecmaVersion: 'latest', // Removed sourceType
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'], // Removed duplicate declaration
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
