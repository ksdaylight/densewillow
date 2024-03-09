/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import tsconfigPaths from 'vite-tsconfig-paths';


export default defineConfig({
    root: __dirname,
    cacheDir: '../../node_modules/.vite/inventory',

    esbuild: {
        // drop: ['console', 'debugger'],
    },
    css: {
        // 开css sourcemap方便找css
        devSourcemap: true,
    },

    server: {
        host: true,
        port: 4300,
        proxy: {
            '/api': {
                target: 'http://localhost:3100',
                changeOrigin: true,
                // eslint-disable-next-line @typescript-eslint/no-shadow
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },

    preview: {
        host: true,
        port: 4300,
    },

    plugins: [
        react(),
        nxViteTsPaths(),
        // 同步tsconfig.json的path设置alias
        tsconfigPaths(),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), 'packages/slash-admin/src/assets/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]',
        }),
        visualizer({
            open: false,
        }),
    ],

    build: {
        outDir: '../../dist/apps/slash-admin',
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        target: 'esnext',
        minify: 'terser',
        terserOptions: {
            compress: {
                // 生产环境移除console
                drop_console: true,
                drop_debugger: true,
            },
        },
    },

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },

    test: {
        globals: true,
        cache: {
            dir: '../../node_modules/.vitest',
        },
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

        reporters: ['default'],
        coverage: {
            reportsDirectory: '../../coverage/packages/slash-admin',
            provider: 'v8',
        },
    },
});
