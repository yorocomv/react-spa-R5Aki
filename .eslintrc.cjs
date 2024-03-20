module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', 'styled-system', 'panda.config.ts', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // 関数コンポーネントの defaultProps は非推奨らしいので eslint-config-airbnb を上書き
    // https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md#deprecate-defaultprops-on-function-components
    'react/require-default-props': [
      'error',
      {
        forbidDefaultForRequired: true,
        functions: 'defaultArguments',
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: ['InputLabel'],
        labelAttributes: ['label'],
        controlComponents: ['Input', 'Select'],
        depth: 3,
      },
    ],
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/no-rest-destructuring': 'warn',
    '@tanstack/query/stable-query-client': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: 'Unexpected property on console object was called',
      },
    ],
  },
};
