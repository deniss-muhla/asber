const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const manifestAssets = fs.readFileSync('./src/assets/manifest/__generated__/index.html', 'utf8').toString();

module.exports = {
    mode: 'development',
    target: 'web',
    entry: {
        app: './src/index.ts'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        disableHostCheck: true,
        index: 'index.html'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin([
            {
                from: './src/assets/manifest/__generated__',
                to: './',
                ignore: ['*.html'],
                cache: true
            }
        ]),
        new HtmlWebpackPlugin({
            title: '[dev] :: asber',
            template: './src/assets/index.html',
            filename: 'index.html',
            manifestAssets
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                include: /node_modules\/react-dom/,
                use: ['react-hot-loader/webpack']
            },
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre'
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
