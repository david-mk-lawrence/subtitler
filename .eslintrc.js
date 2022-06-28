module.exports = {
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
        project: "./tsconfig.json",
    },
    plugins: ["react", "react-hooks", "@typescript-eslint"],
    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "arrow-body-style": ["warn", "as-needed"],
        "comma-dangle": ["warn", "always-multiline"],
        eqeqeq: "error",
        "guard-for-in": "warn",
        "lines-between-class-members": ["warn", "always"],
        "no-console": "warn",
        "no-debugger": "warn",
        "no-param-reassign": "warn",
        "no-plusplus": "warn",
        "padding-line-between-statements": [
            "warn",
            { blankLine: "always", prev: "block-like", next: "*" },
            { blankLine: "always", prev: "multiline-expression", next: "*" },
        ],
        "prefer-const": "warn",

        "react/jsx-boolean-value": ["warn", "always"],
        "react/jsx-uses-vars": "warn",
        "react/no-access-state-in-setstate": "error",
        "react/no-deprecated": "warn",
        "react/no-did-mount-set-state": "warn",
        "react/no-did-update-set-state": "warn",
        "react/no-direct-mutation-state": "error",
        "react/no-find-dom-node": "warn",
        "react/no-this-in-sfc": "error",
        "react/no-unescaped-entities": "warn",
        "react/no-unused-prop-types": "warn",
        "react/no-unused-state": "warn",
        "react/no-will-update-set-state": "warn",
        "react/prefer-stateless-function": "warn",
        "react/style-prop-object": "warn",

        "react-hooks/exhaustive-deps": "warn",
        "react-hooks/rules-of-hooks": "warn",

        "@typescript-eslint/array-type": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/consistent-type-assertions": [
            "warn",
            {
                assertionStyle: "as",
                objectLiteralTypeAssertions: "allow-as-parameter",
            },
        ],
        "@typescript-eslint/no-non-null-assertion": "warn",
        "@typescript-eslint/no-unused-vars": [
            "warn",
            { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/no-use-before-define": "warn",
    },
    overrides: [
        {
            files: ["**/__tests__/*"],
            rules: {
                "@typescript-eslint/camelcase": "off",
                "@typescript-eslint/no-explicit-any": "off",
                "@typescript-eslint/no-non-null-assertion": "off",
                "@typescript-eslint/consistent-type-assertions": "off",
            },
        },
        {
            files: ["src/main/**"],
            rules: {
                "no-console": "off",
            },
        },
    ],
}
