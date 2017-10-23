const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [

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
        include: path.resolve('src', 'icons-svg'),
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
        include: path.resolve('src', 'images'),
        use: [
            'url-loader?limit=1500&name=[path][name].[ext]',
            'img-loader'
        ]
    }

];
