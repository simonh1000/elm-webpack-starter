module.exports = {
    purge: {
        mode: 'layers',
        layers: ["base", "components", "utilities"],
        content: ['./src/*.elm', './src/**/*.elm'],
    },
    theme: {
        extend: {}
    },
    variants: {},
    plugins: []
};
