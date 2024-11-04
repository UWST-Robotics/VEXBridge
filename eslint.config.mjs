import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslint from "@eslint/js";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    {
        ignores: ['dist', 'out', 'node_modules'],
        files: ['**/*.{ts,tsx}'],
        plugins: {
            "react-refresh": reactRefresh,
            "react-hooks": reactHooks,
        },
        rules: {
            'react-refresh/only-export-components': [
                'warn',
                {allowConstantExport: true},
            ],

            // Used for static classes
            '@typescript-eslint/no-extraneous-class': 'off',

            // Used for React Effect Hooks
            '@typescript-eslint/no-empty-function': 'off',

            // Used for ANSI parsing
            'no-control-regex': 'off',
        },
    },
)
