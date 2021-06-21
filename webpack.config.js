const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = (env, argv) => {
    return {
        entry: {
            main: "./src/index.js",
        },
        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "[name].bundle.js"
        },
        target: "web", // needed or live reload fails
        devtool: argv.mode === "production" ? "cheap-source-map" : "inline-source-map",
        devServer: {
            contentBase: "dist",
            publicPath: "/",
            open: true,
            hot: false,
            liveReload: true,
            historyApiFallback: true, // SPA
        },
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    use: ["raw-loader"],
                },
               

                {
                    test: /\.css$/i,
                    use: ["raw-loader"],
                },


            ],
        },
        plugins: [
            // new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./src/index.html", // template file
                filename: "index.html", // output file
                favicon: './src/assets/favicon.ico',
            }),
            new CopyPlugin({
                patterns: [
                    { from: "src/assets", to: "assets" },
                    { from: "src/styles.css", to: "styles.css" },
                    { from: "src/index.css", to: "index.css" },
                    { from: "src/normalize.css", to: "normalize.css" },
                    {
                        from: "node_modules/material-design-icons/iconfont/*.*",
                        to({ context, absoluteFilename }) {
                            return "material-design-icons/iconfont/[name][ext]";
                        }

                    },
                    {
                        from: "node_modules/@fortawesome/fontawesome-free/*.*",
                        to({ context, absoluteFilename }) {
                            return "fortawesome/fontawesome-free/[name][ext]";
                        },                     
                    },
                    {
                        from: "node_modules/@fortawesome/fontawesome-free/webfonts/*.*",
                        to({ context, absoluteFilename }) {
                            return "fortawesome/fontawesome-free/webfonts/[name][ext]";
                        }
                    },
                    {
                        from: "node_modules/@fortawesome/fontawesome-free/css/*.*",
                        to({ context, absoluteFilename }) {
                            return "fortawesome/fontawesome-free/css/[name][ext]";
                        }
                    }
                ],
            }),

        ],
        optimization: {
            minimize: argv.mode === "production",
        },
    }
}