module.exports = {
    root: true,
    env: {
        browser: true,  // browser 全局变量。
        es6: true,  // 支持除模块外所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
        node: true  // Node.js 全局变量和 Node.js 作用域。
    },
    extends: [
        'plugin:vue/recommended',
        'standard'
    ],
    plugins: ['vue'],
    rules: {
        // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': 'off',
        'no-console': 'off',
        'no-param-reassign': [2, {props: false}],
        // 'max-len': [0, 160, 4], // 字符串最大长度
        'no-new': 0,
        'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
        'vue/max-attributes-per-line': 'off',
        'vue/require-prop-types': 'off',
        'quotes': ['error', 'single'],
        'one-var': 'off',
        'indent': ["error", 2, {"ignoreComments": true}],
        'vue/singleline-html-element-content-newline': 'off',
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            modules: true
        }
    },
};
