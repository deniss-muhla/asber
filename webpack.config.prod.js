const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    target: 'web',
    entry: './src/index.ts',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: ':: asber',
            template: './src/assets/index.html',
            filename: 'index.[contenthash].html',
            minify: true,
            cspPlugin: {
                enabled: true,
                policy: {
                    'base-uri': "'self'",
                    'object-src': "'none'",
                    'script-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
                    'style-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"]
                },
                hashEnabled: {
                    'script-src': true,
                    'style-src': true
                },
                nonceEnabled: {
                    'script-src': true,
                    'style-src': true
                }
            }
        }),
        new SriPlugin({
            hashFuncNames: ['sha256', 'sha384'],
            enabled: true
        }),
        new CspHtmlWebpackPlugin(
            {
                'base-uri': "'self'",
                'object-src': "'none'",
                'script-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
                'style-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"]
            },
            {
                enabled: true,
                hashingMethod: 'sha256',
                hashEnabled: {
                    'script-src': true,
                    'style-src': true
                },
                nonceEnabled: {
                    'script-src': true,
                    'style-src': true
                }
            }
        )
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
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        crossOriginLoading: 'anonymous'
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};
