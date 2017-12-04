'use strict';
// Imports
const path = require('path');
const webpack = require('webpack');
const plugins = require('./config/plugins');
const loaders = require('./config/loaders');
const isProd = process.env.npm_lifecycle_event === 'build';


// Config
module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
    },

    devtool: !isProd ? "source-map" : false,

    module: {
        rules: loaders,
    },

    plugins: plugins,
};