module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },

  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'jest'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error'],
  },
};
