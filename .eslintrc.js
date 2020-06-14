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
  },
  // settings: {
  //   'import/extensions': [
  //     '.js', '.jsx', '.ts', '.tsx',
  //   ],
  // },
  root: true,
};
