import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

import { defineConfig, UserConfig } from 'vite';

import BasicSSLPlugin from '@vitejs/plugin-basic-ssl';
import LegacyBrowserPlugin from '@vitejs/plugin-legacy';
import VuePlugin from '@vitejs/plugin-vue';

const packageJSONRaw = fs.readFileSync(path.join(__dirname, 'package.json')).toString();
const packageJSON = JSON.parse(packageJSONRaw);

const gitRef = child_process.execSync('git rev-parse HEAD').toString().trim().slice(0, 6);

const buildCommonConfig: () => UserConfig = () => ({
    appType: 'spa',
    root: '.',
    mode: 'development',
    publicDir: path.join(__dirname, 'static'),

    resolve: {
        alias: {
            '@app': '/app',
        },
    },

    define: {
        __VERSION__: JSON.stringify(packageJSON['version'] || '0.0.0'),
        __GITREF__: JSON.stringify(gitRef || 'git-unknown'),
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

    plugins: [BasicSSLPlugin(), LegacyBrowserPlugin(), VuePlugin()],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(async ({ command, mode, ssrBuild }) => {
    const config = buildCommonConfig();
    return config;
});
