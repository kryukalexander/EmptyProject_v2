const ENV = process.env.npm_lifecycle_event;

module.exports = {
    plugins: {
        'postcss-import': {},
        'autoprefixer': {},
        'postcss-flexbugs-fixes' : {},
        'postcss-at2x' : {
            skipMissingRetina: true
        },
        'postcss-sprites': {
            retina: true,
            spritePath: 'src/images/',
            filterBy: (image) => {
                if (!/\/images-sprite\//.test(image.url)) {
                    return Promise.reject();
                }
                return Promise.resolve();
            }
        },
        'postcss-inline-svg': {},
        'cssnano' : ENV === 'build' ? {} : false,
    }
};
