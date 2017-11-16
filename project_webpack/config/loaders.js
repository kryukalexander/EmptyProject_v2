const path = require('path');
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
                { loader: 'css-loader', options: {sourceMap: true} },
                { loader: 'postcss-loader', options: {sourceMap: true} },
                { loader: 'sass-loader', options: {sourceMap: true} },
            ],
            publicPath: '../'
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
        include: path.resolve('src', 'images', 'icons-svg'),
        use: [
            {
                loader: 'svg-sprite-loader',
                options: { spriteFilename: 'images/sprite.svg' } },
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
        exclude: path.resolve('src', 'images', 'icons-svg'),
        use: [
            'url-loader?limit=1500&name=[path][name].[ext]',
            'img-loader'
        ]
    }

];
