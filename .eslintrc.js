module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['prettier', 'airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 0,
    'no-plusplus': 0,
    'no-console': 0,
  },
  // settings: {
  //   'import/extensions': [
  //     '.js', '.jsx', '.ts', '.tsx',
  //   ],
  // },
  root: true,
};
