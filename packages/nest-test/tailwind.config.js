// eslint-disable-next-line @typescript-eslint/unbound-method
const { join } = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');

module.exports = {
    content: [
        join(__dirname, '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
