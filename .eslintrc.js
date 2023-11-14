module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: 'eslint:recommended',
    overrides: [
        {
            files: [
                '.eslintrc.{js,cjs}'
            ]
        }
    ],
    globals: {
        describe: "readonly",
        it: "readonly"
    },
    rules: {
        indent: [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ],
        "no-unused-vars": [
            "off"
        ]
    }
};
