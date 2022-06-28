const path = require("path")
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
    resolve: {
        alias: {
            ["@"]: path.resolve(__dirname, "src"),
        },
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: /src/,
                exclude: /(node_modules|\.webpack)/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: "[name]__[local]__[hash:base64:5]",
                            },
                        },
                    },
                ],
                include: /\.module\.css$/,
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                ident: "postcss",
                                plugins: [
                                    require("tailwindcss"),
                                    require("autoprefixer"),
                                ],
                            },
                        },
                    },
                ],
                exclude: /\.module\.css$/,
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
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}
