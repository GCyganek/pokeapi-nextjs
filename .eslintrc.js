const fs = require("fs");

const folders = fs
  .readdirSync("src", { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

module.exports = {
  env: { browser: true, node: true, amd: true },
  settings: { react: { version: "detect" } },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["simple-import-sort", "jsx-a11y"],
  extends: [
    "next",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 2,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-var-requires": 0,
    "prettier/prettier": [1, {}, { usePrettierrc: true }],
    // "react/forbid-dom-props": [1, { forbid: ["style"] }],
    "react/forbid-elements": [1, { forbid: ["style"] }],
    "react/forbid-elements": [
      2,
      { forbid: [{ element: "a", message: "use <Link> instead" }] },
    ],
    "react/forbid-prop-types": [1, { forbid: ["style", "className", "id"] }],
    "react/jsx-no-undef": 0,
    "react/prop-types": 0,
    "react/self-closing-comp": [1, { component: true, html: true }],
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 2,
    "simple-import-sort/exports": 1,
    "simple-import-sort/imports": 1,
    "no-console": [1, { allow: ["error", "warn", "debug", "time", "timeEnd"] }],
    "jsx-a11y/no-autofocus": 0,
  },
  overrides: [
    {
      files: ["*.stories.tsx"],
      rules: {
        "import/no-anonymous-default-export": 0,
        "react-hooks/rules-of-hooks": 0,
        "react/display-name": 0,
      },
    },
    {
      files: ["*.tsx", "*.ts"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Packages. `react` related packages come first.
              // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
              ["^react", "^@?\\w"],
              // Absolute imports and Relative imports.
              [`^(${folders.join("|")})(/.*|$)`, "^\\."],
              // for scss imports.
              ["^[^.]"],
            ],
          },
        ],
      },
    },
  ],
};
