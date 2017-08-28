const autoprefixerSettings = ['last 25 versions', '> 1%', 'ie 8', 'ie 7'];
const ENV = process.env.npm_lifecycle_event;

module.exports = {
    plugins: {
        'postcss-import': {},
        'autoprefixer': {
            browsers: autoprefixerSettings,
        },
        'cssnano' : ENV === 'build' ? {} : false,
        'postcss-flexbugs-fixes' : {},
        'postcss-sprites': { spritePath: './src/images/' }
    }
};

//todo postcss-at2x
//todo postcss-inline-svg