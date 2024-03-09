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
        domains: [
            `${new URL(process.env.NEXT_PUBLIC_SITE_URL || '').hostname}`,
            'avatars.githubusercontent.com',
        ],
    },
    env: {
        // APP_PREFIX: process.env.APP_PREFIX || 'api', // 编译另外一个api-contract模块时用到的env参数需在此显示写出来
        SERVER_PUBLIC_URL: process.env.SERVER_PUBLIC_URL || '', // 被client引用的env参数需在此显示写出来
        APP_HOST: process.env.APP_HOST || '',
        APP_PORT: process.env.APP_PORT || '',
    },
    experimental: {
        serverActions: true,
    },
};

const plugins = [
    // Add more Next.js plugins to this list if needed.
    withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
