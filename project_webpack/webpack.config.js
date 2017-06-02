const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const styles = [
    'css-loader',
    'postcss-loader',
    'sass-loader',
];

//todo insert babel

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist/assets'),
        filename: 'js/bundle.js',
        publicPath: 'assets/',
    },
    devServer: {
        contentBase: path.resolve(__dirname, './src'),

    },

    module: {
        rules: [

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
        template: 'index.pug',
        filename: '../index.html',
        inject: false,
        minify: false,
        alwaysWriteToDisk: false
    }),
    new HtmlWebpackHarddiskPlugin()
    ]
};