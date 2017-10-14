'use strict';
// Imports
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpritePlugin = require('svg-sprite-loader/plugin');

// Settings

let cleanOptions = {
    root:    __dirname,
    verbose:  true,
    dry:      false
};

const tmpLang = 'pug';

let pluginsCommon = [
    new ExtractTextPlugin('css/styles.css'),
    new HtmlWebpackPlugin({
        template: 'templates/index.' + tmpLang,
        inject: true,
    }),
    new SpritePlugin()
];

let pluginsBuild = [
    new CleanWebpackPlugin([ 'dist' ], cleanOptions),
];

pluginsBuild = pluginsBuild.concat(pluginsCommon);

const isProd = process.env.npm_lifecycle_event === 'build';
let pluginsArray = isProd ? pluginsBuild : pluginsCommon;


// Config
module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'js/bundle.js',
    },

    module: {
        rules: [

            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] },
                }],
            },

            {
                test: /\.(sass|scss|css)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                })
            },

            {
                test: /\.html$/,
                use: "html-loader?minimize=false"
            },

            {
                test: /\.pug$/,
                use: "pug-loader?pretty=true"
            },

            {
                test: /\.svg$/,
                include: path.resolve('./src/icons-svg'),
                use: [
                    {
                        loader: 'svg-sprite-loader', options: {} },
                    {
                        loader: 'img-loader',
                        options: {
                            svgo: {
                                plugins: [
                                    { removeAttrs: { attrs: '(fill|stroke)' } }
                                ],
                            },

                        },
                    },
                ]
            },

            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                include: path.resolve('./src/img'),
                use: [
                    'url-loader?limit=1500&name=[path][name].[ext]',
                    'img-loader'
                ]
            }

        ],
    },

    plugins: pluginsArray

};