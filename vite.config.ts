import { defineConfig, UserConfig } from 'vite';

import BasicSSLPlugin from '@vitejs/plugin-basic-ssl';
import LegacyBrowserPlugin from '@vitejs/plugin-legacy';
import VuePlugin from '@vitejs/plugin-vue';


const buildCommonConfig: () => UserConfig = () => ({
    appType: 'spa',
    root: '.',
    mode: 'development',
    publicDir: './static',

    resolve: {
        alias: {
            '@app': "/app",
        }
    },

    define: {
        __VERSION__: JSON.stringify("UNKNOWN"),
        __GITREF__: JSON.stringify("UNKNOWN"),
    },

    css: {
        // ??
        devSourcemap: true,
    },

    build: {
        outDir: './build',
        manifest: true,
    },

    server: {
        https: true,
        port: 8443,
        hmr: true,
    },

    plugins: [
        BasicSSLPlugin(),
        LegacyBrowserPlugin(),
        VuePlugin(),
    ]
});

export default defineConfig(async ({ command, mode, ssrBuild }) => {
    const config = buildCommonConfig();
    return config;
});