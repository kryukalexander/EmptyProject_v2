'use strict';
// Imports
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Settings
const styles = [
    'css-loader',
    'postcss-loader',
    'sass-loader',
];

let pathsToClean = [ 'dist' ];

let cleanOptions = {
    root:    __dirname,
    verbose:  true,
    dry:      false
};

const tmpLang = 'pug';



let pluginsDev = [
    new ExtractTextPlugin('css/styles.css'),
    new HtmlWebpackPlugin({
        template: 'templates/index.' + tmpLang,
        inject: true,
    }),
];

let pluginsBuild = [
    new ExtractTextPlugin('css/styles.css'),
    new HtmlWebpackPlugin({
        template: 'templates/index.' + tmpLang,
        inject: true,
    }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
];

const isProd = process.env.npm_lifecycle_event === 'build';
let pluginsArray = isProd ? pluginsBuild : pluginsDev;


// Config
module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/bundle.js',
        publicPath: '/',
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist/'),
        watchContentBase: true,
        publicPath: '/',
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
                    use: styles
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
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=1500&name=[path][name].[ext]',
                    'img-loader'
                ]
            },

        ],
    },


    plugins: pluginsArray

};