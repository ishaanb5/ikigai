module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['react-app', 'react-app/jest', 'airbnb', 'airbnb/hooks'],
  rules: {
    'linebreak-style': ['error', 'windows'],
    semi: [2, 'never'],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
    'import/newline-after-import': 0,
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': 0,
    'object-curly-newline': 0,
    'react/jsx-one-expression-per-line': 0,
    'implicit-arrow-linebreak': 0,
    'react/jsx-curly-newline': 0,
  },
}
