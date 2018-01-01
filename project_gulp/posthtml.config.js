let locals = {
    locals: {
        index: {
            title: 'Index'
        },

        title: 'Body',
        subtitle: 'Some body text'
    }
};


module.exports = {
    plugins: [
        require('posthtml-include')({}),
        require('posthtml-expressions')(locals)]
};