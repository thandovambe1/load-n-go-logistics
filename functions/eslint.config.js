import eslintPluginNode from "eslint-plugin-node";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      node: eslintPluginNode,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
