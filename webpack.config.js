/* eslint-disable */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DefinePlugin = require('webpack').DefinePlugin;

let babelLoader = { loader: 'babel-loader' };

let tsLoader = {
    loader: 'ts-loader',
    options: {
        transpileOnly: true,
    },
}

let versionData = null;
if (process.env.HEROKU_SLUG_COMMIT || process.env.HEROKU_RELEASE_VERSION || process.env.HEROKU_RELEASE_CREATED_AT) {
    versionData = {
        commit: process.env.HEROKU_SLUG_COMMIT,
        version: process.env.HEROKU_RELEASE_VERSION,
        createdAt: process.env.HEROKU_RELEASE_CREATED_AT,
    };
} 

let htmlLoader = { loader: 'html-loader' };
let sassLoader = { loader: 'sass-loader', options: {sourceMap: true}};
let cssLoader = { loader: 'css-loader', options: { sourceMap: true, modules: {
    localIdentName: "[hash:base64]__[local]", // XXX: make this opaque for prod?
} } };
let cssModulesTyescriptLoader = { loader: 'css-modules-typescript-loader' };
let miniCssExtractLoader = { loader: MiniCssExtractPlugin.loader };
let styleLoader = { loader: 'style-loader' };

module.exports = {
    devtool: "source-map",
    entry: "./src/app.tsx",
    output: {
        filename: "app.bundle.js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        plugins: [
            new TsconfigPathsPlugin(),
        ],
    },
    module: {
        rules: [
            { test: /\.tsx?$/, use: [babelLoader, tsLoader] },
            { test: /\.html$/, use: [htmlLoader] },
            { test: /\.s[ac]ss/, use: [miniCssExtractLoader, cssLoader, sassLoader] },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
        }),
        new DefinePlugin({
            VERSION_DATA: JSON.stringify(versionData),
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                sourceMap: true,
            }),
        ],
    },
    devServer: {
        
    },
};