const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const styles = [
    'css-loader',
    'postcss-loader',
    'sass-loader',
];

//todo insert babel
//todo insert html loader

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist/assets'),
        filename: 'bundle.js',
        publicPath: '/assets',
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
                loaders: [
                    "html-loader",
                    "file-loader?name=../[name].[ext]" ]
            },

            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            },

        ],
    },
    plugins: [
    new ExtractTextPlugin('styles.css'),
    ]
};