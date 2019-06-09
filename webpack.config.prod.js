const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const manifestAssets = fs
    .readFileSync('./src/assets/manifest/__generated__/index.html', 'utf8')
    .toString()
    .replace(/\r?\n/, '');

module.exports = {
    mode: 'production',
    stats: 'errors-only',
    target: 'web',
    entry: './src/index.ts',
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
            title: ':: asber',
            template: './src/assets/index.html',
            filename: 'index.html',
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
            },
            manifestAssets
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
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
