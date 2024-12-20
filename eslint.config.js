import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import babelParser from "@babel/eslint-parser";
import stylistic from "@stylistic/eslint-plugin";
import prettier from "eslint-plugin-prettier";

export default [
    { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
    {
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                // 없으면 babelParser 동작 안함
                requireConfigFile: false,
                babelOptions: {
                    babelrc: false,
                    configFile: false,
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                        "@babel/preset-typescript",
                        "@babel/preset-flow",
                    ],
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            ...pluginJs.configs.recommended,
            "@stylistic": stylistic,
            ...prettier,
            ...tseslint.configs.recommended, // 타입스크립트
            ...pluginReact.configs.flat.recommended, // 리액트
        },
        rules: {
            "@stylistic/indent": ["error", 4, { SwitchCase: 1 }], // https://eslint.style/rules/js/indent
            semi: "error", // https://eslint.org/docs/latest/rules/semi
            camelcase: ["error", { properties: "always" }], // https://eslint.org/docs/latest/rules/camelcase
            "no-var": "error", // https://eslint.org/docs/latest/rules/no-var
            "prefer-arrow-callback": "error", // https://eslint.org/docs/latest/rules/prefer-arrow-callback
            "no-object-constructor": "error", // https://eslint.org/docs/latest/rules/no-object-constructor
            "no-array-constructor": "error", // https://eslint.org/docs/latest/rules/no-array-constructor
            "no-new-wrappers": "error", // https://eslint.org/docs/latest/rules/no-new-wrappers
            "no-new-func": "error", // https://eslint.org/docs/latest/rules/no-new-func
            "object-shorthand": "error", // https://eslint.org/docs/latest/rules/object-shorthand
            eqeqeq: ["error", "always"], // https://eslint.org/docs/latest/rules/eqeqeq
            "prefer-template": "error", // https://eslint.org/docs/latest/rules/prefer-template
            "@stylistic/array-bracket-newline": ["error", { multiline: true }], // https://eslint.style/rules/js/array-bracket-newline#multiline
            "@stylistic/function-call-spacing": ["error", "never"], // https://eslint.style/rules/default/function-call-spacing
            "@stylistic/space-before-function-paren": [
                "error",
                {
                    asyncArrow: "always",
                    named: "never",
                },
            ], // https://eslint.style/rules/default/space-before-function-paren
            "@stylistic/arrow-parens": ["error", "always"], // https://eslint.style/rules/default/arrow-parens
            "@stylistic/arrow-spacing": "error", // https://eslint.style/rules/default/arrow-spacing
            "@stylistic/no-confusing-arrow": "error", // https://eslint.style/rules/default/no-confusing-arrow
            "@stylistic/implicit-arrow-linebreak": ["error", "beside"], // https://eslint.style/rules/js/implicit-arrow-linebreak
            "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }], // https://eslint.style/rules/js/brace-style
            "@stylistic/keyword-spacing": "error", // https://eslint.style/rules/js/keyword-spacing
        },
    },
];
