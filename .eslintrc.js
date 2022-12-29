module.exports = {
  root: true,
  reportUnusedDisableDirectives: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/ban-types': [0, false],
    '@typescript-eslint/explicit-module-boundary-types': [0],
    '@typescript-eslint/no-explicit-any': [0],
    '@typescript-eslint/no-use-before-define': ['error'],
  },

  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        'no-console': 'off',
      }
    },
    {
      files: ['config/*'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      }
    }
  ]

};