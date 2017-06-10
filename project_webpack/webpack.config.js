const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const styles = [
    'css-loader',
    'postcss-loader',
    'sass-loader',
];

let pathsToClean = [
    'dist'
];

let cleanOptions = {
    root:    __dirname,
    verbose:  true,
    dry:      false
};

const tmpLang = 'pug';

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist/assets'),
        filename: 'js/bundle.js',
        publicPath: '/',
    },
    devServer: {
        contentBase: path.resolve(__dirname, './dist/'),
        watchContentBase: true,
        publicPath: '/'

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
                    'url-loader?limit=10000&name=[path][name].[ext]',
                    'img-loader'
                ]
            },

        ],
    },
    plugins: [
    new ExtractTextPlugin('css/styles.css'),
    new HtmlWebpackPlugin({
        template: tmpLang + '/index.' + tmpLang,
        filename: '../index.html',
        inject: true,
    }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    ],

};