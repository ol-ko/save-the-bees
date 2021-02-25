module.exports = {
    plugins: ['prettier'],
    extends: ['plugin:prettier/recommended'],
    rules: {
        'prettier/prettier': ['error', { singleQuote: true, printWidth: 120, tabWidth: 4 }],
    },
    parserOptions: {
        ecmaVersion: 2019,
    },
    env: {
        es6: true,
    },
};
