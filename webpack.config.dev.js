const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

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
        new ManifestPlugin(),
        new WebappWebpackPlugin({
            logo: path.resolve('src/assets/logo.svg'),
            cache: true,
            prefix: '',
            inject: true,
            favicons: {
                appName: '[dev] :: asber',
                appDescription: 'Anti-Social Behaviour Therapy',
                developerName: 'Deniss Muhļa <deniss.muhla@gmail.com>',
                developerURL: null,
                background: '#ddd',
                theme_color: '#333',
                icons: {
                    android: false,
                    appleIcon: false,
                    appleStartup: false,
                    coast: false,
                    favicons: true,
                    firefox: false,
                    windows: false,
                    yandex: false
                }
            }
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: '[dev] :: asber',
            template: './src/assets/index.html',
            filename: 'index.html'
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
