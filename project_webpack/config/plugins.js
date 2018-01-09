const templatesLanguage = 'html';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpritePlugin = require('svg-sprite-loader/plugin');
const patch = require('path');


module.exports = [
    new ExtractTextPlugin('css/style.css'),
    new HtmlWebpackPlugin({
        template: 'templates/index.' + templatesLanguage,
        inject: true,
    }),
    new SpritePlugin(),
    new CleanWebpackPlugin( [ patch.resolve('dist') ], { allowExternal: true })
];