// rollup.config.js
// ES output
var common = require('./rollup.js');

module.exports = {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.esm.js',
        format: 'es',
        // When export and export default are not used at the same time, set legacy to true.
        // legacy: true,
        banner: common.banner,
    },
    plugins: [
        common.getCompiler({
            tsconfigOverride: {
                compilerOptions: {
                    declaration: true,
                    declarationDir: './types',
                    module: 'ES6',
                    // strict: true,
                    target: 'ESNext',
                },
            },
            useTsconfigDeclarationDir: true,
        }),
    ],
};
