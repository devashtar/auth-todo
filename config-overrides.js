const { resolve } = require('path');

module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        alias: {
            ...config.alias,
            '@API': resolve(__dirname, 'src/API'),
            '@services': resolve(__dirname, 'src/services'),
            '@components': resolve(__dirname, 'src/components'),
            '@pages': resolve(__dirname, 'src/pages'),
            '@store': resolve(__dirname, 'src/store'),
            '@types': resolve(__dirname, 'src/types'),
            '@': resolve(__dirname, 'src')
            // here your new aliases (just specify directory to current folder)
        },
    };

    return config;
};
