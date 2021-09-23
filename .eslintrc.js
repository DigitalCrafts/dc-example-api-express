module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2020,
  },
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  root: true,
  extends: [
    'airbnb-base',
    'plugin:node/recommended',
    'plugin:jsdoc/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'import/order': [
      'warn',
      {
        alphabetize: { order: 'asc' },
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'never',
      },
    ],
    'jsdoc/check-property-names': 'off',
    'jsdoc/check-syntax': 'warn',
    'jsdoc/check-types': 'off',
    'jsdoc/check-tag-names': 'off',
    'jsdoc/newline-after-description': ['warn', 'never'],
    'jsdoc/require-description': ['warn', { descriptionStyle: 'body' }],
    'jsdoc/valid-types': 'off',
    'jsdoc/no-undefined-types': 'off',
    'no-extra-semi': 'error',
    'no-console': 'off',
  },
};
