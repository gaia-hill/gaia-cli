module.exports = {
  fix: true,
  path: ['src'],
  ts: true,
  formatter: 'stylish',
  extensions: ['.js', '.ts'],
  delay: 1500,
  config: {
    // 此处规则仅做示范，具体eslint规范请根据自己需求填写
    extends: [
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended'
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'warn',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      'no-multi-spaces': 'off',
      'no-continue': 'off',
      'no-await-in-loop': 'off',
      'no-console': 'off',
      'no-use-before-define': 'off',
      'no-restricted-syntax': 'off',
    },
  },
};
