// eslint-disable-next-line @typescript-eslint/unbound-method
const { join } = require('path');

module.exports = {
    plugins: {
        tailwindcss: {
            config: join(__dirname, 'tailwind.config.js'),
        },
        autoprefixer: {},
    },
};
