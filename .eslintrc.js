module.exports = {
  env: {
    "es2021": true,
    "node": true,
    "jest": true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    "@typescript-eslint",
    "prettier",
    "import"],
  extends: [
    "airbnb-base",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "eslint:recommended"
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "error",
    "no-useless-constructor": "off", 
    "no-empty-function": "off",
    "class-methods-use-this": "off",
    "prettier/prettier": "error",
    "no-unused-vars": ["off", {
      "argsIgnorePattern": "_"
    }],
    // "@typescript-eslint/naming-convention": [
    //   "error",
    //   {
    //     "selector": "interface",
    //     "format": ["PascalCase"],
    //     "custom": {
    //       "regex": "^I[A-Z]",
    //       "match": true
    //     }
    //   }
    // ],
    "camelcase": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never"
      }
    ]
  },
  settings: {
    "import/extensions": [
      ".js",
      ".jsx",
      ".tsx",
      ".ts"
    ],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      }
    }
  }
};
