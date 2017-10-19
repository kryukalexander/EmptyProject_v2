const templatesLanguage = 'pug';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SpritePlugin = require('svg-sprite-loader/plugin');


module.exports = [
    new ExtractTextPlugin('css/style.css'),
    new HtmlWebpackPlugin({
        template: 'templates/index.' + templatesLanguage,
        inject: true,
    }),
    new SpritePlugin(),
    new CleanWebpackPlugin(
        [ 'dist' ],
        {
            root: __dirname,
            verbose:  true,
            dry: false}
    )
];