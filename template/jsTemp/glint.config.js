module.exports = {
  fix: true,
  path: ['src'],
  ts: false,
  formatter: 'stylish',
  extensions: ['.js', '.ts'],
  delay: 1500,
  config: {
    // 此处规则仅做示范，具体eslint规范请根据自己需求填写
    extends: [
      'eslint:recommended'
    ],
    rules: {
      'no-multi-spaces': 'off',
      'no-continue': 'off',
      'no-await-in-loop': 'off',
      'no-console': 'off',
      'no-use-before-define': 'off',
      'no-restricted-syntax': 'off',
    },
  },
};
