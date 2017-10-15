const autoprefixerSettings = ['last 25 versions', '> 1%', 'ie 8', 'ie 7'];
const ENV = process.env.npm_lifecycle_event;

// todo investigate possibility to move browser settings to package.json or somewhere else
module.exports = {
    plugins: {
        'postcss-import': {},
        'autoprefixer': {
            browsers: autoprefixerSettings,
        },
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
