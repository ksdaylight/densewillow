// @ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const fs = require('fs');
const path = require('path');

const { composePlugins, withNx } = require('@nx/next');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 * */
const nextConfig = {
    nx: {
        // Set this to true if you would like to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },
    images: {
        domains: ['192.168.80.6'],
    },
    env: {
        APP_PREFIX: process.env.APP_PREFIX || 'test',
    },
};

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
