module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: [
      "@typescript-eslint"
    ],
    extends: [
        '@react-native-community',
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
    }
};
  