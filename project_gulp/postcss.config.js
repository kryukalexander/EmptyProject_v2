module.exports = {
    plugins: {
        'postcss-import': {},
        'autoprefixer': {},
        'postcss-flexbugs-fixes' : {},
        'postcss-assets': {},
        'postcss-at2x' : {
            skipMissingRetina: true
        },
        'postcss-sprites': {
            retina: false,
            spritesmith: {
                padding: 10
            },
            spritePath: 'src/images/',
            filterBy: (image) => {
                if (!/\/images-sprite\//.test(image.url)) {
                    return Promise.reject();
                }
                return Promise.resolve();
            }
        },
        'postcss-inline-svg': {},
        'cssnano' : {}
    }
};
