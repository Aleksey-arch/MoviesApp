module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'airbnb', // или "eslint:recommended"
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'linebreak-style': ['warn', 'unix'],
    'operator-linebreak': ['warn', 'after'],
    indent: ['off', 2],
    'import/prefer-default-export': 'off', // Отключено
    'comma-dangle': 'off',
    'no-unused-vars': 'warn',
    'object-curly-newline': [
      'warn',
      {
        ObjectExpression: 'always'
      }
    ],
    'arrow-body-style': ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'react/prop-types': 'off'
  }
};
