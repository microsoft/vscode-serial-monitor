// Copyright (c) Microsoft Corporation.

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: "2019",
    sourceType: "module",
  },
  plugins: ["header"],
  ignorePatterns: ["**/*.js", "*.d.ts"],
  rules: {
    "@typescript-eslint/naming-convention": "off",
    "no-empty": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "header/header": [
      "warn",
      "line",
        [" Copyright (c) Microsoft Corporation.", " Licensed under the MIT License."],
    ],
    "no-unused-expressions": ["warn", { allowShortCircuit: true }],
  },
};
