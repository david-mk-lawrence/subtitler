const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
    entry: "./src/main/main.ts",
    resolve: {
        alias: {
            ["@"]: path.resolve(__dirname, "src"),
        },
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules|\.webpack)/,
                include: /src/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.node$/,
                use: {
                    loader: "node-loader",
                },
            },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                semantic: true,
                syntactic: true,
                },
                mode: "write-references",
            },
        }),
        new CopyPlugin({
            patterns: [
                { from: "assets/locales", to: "locales" },
            ],
        })
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
}
