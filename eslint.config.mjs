import tseslint from "typescript-eslint"
import eslint from "@eslint/js";
import react from "eslint-plugin-react";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    {
        ignores: ["dist", "out", "node_modules"],
        files: ["**/*.{ts,tsx}"],
        plugins: {
            react
        },
        rules: {

            // Used for static classes
            "@typescript-eslint/no-extraneous-class": "off",

            // Used for React Effect Hooks
            "@typescript-eslint/no-empty-function": "off",

            // Used for ANSI parsing
            "no-control-regex": "off",

            // Require Semi-colons
            "semi": ["warn", "always"],

            // Require props to be wrapped in {}
            "react/jsx-curly-brace-presence": ["warn", {"props": "always"}],

            // Enforce double-quotes
            "quotes": ["warn", "double"]
        }
    }
);
