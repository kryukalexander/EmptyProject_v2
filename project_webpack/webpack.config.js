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
    entry: './app.js',
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
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: styles
                })
            },

        ],
    },
    plugins: [
    new ExtractTextPlugin('styles.css'),
    ]
};