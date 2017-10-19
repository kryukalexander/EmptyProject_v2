'use strict';
// Imports
const path = require('path');
const webpack = require('webpack');
const plugins = require('./config/plugins');
const loaders = require('./config/loaders');

// Config
module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'js/bundle.js',
    },

    module: {
        rules: loaders,
    },

    plugins: plugins
};