import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

import { defineConfig, UserConfig } from 'vite';

import BasicSSLPlugin from '@vitejs/plugin-basic-ssl';
// import LegacyBrowserPlugin from '@vitejs/plugin-legacy';
import VuePlugin from '@vitejs/plugin-vue';

import NodePolyfillsPlugin from 'vite-plugin-node-stdlib-browser';

const packageJSONRaw = fs.readFileSync(path.join(__dirname, 'package.json')).toString();
const packageJSON = JSON.parse(packageJSONRaw);

const gitRef = (() => {
    try {
        return child_process.execSync('git rev-parse HEAD').toString().trim().slice(0, 6);
    } catch (exc) {
        console.error('Could not use git CLI to source commit ID; defaulting to env');
    }

    if (process.env.CODEBUILD_RESOLVED_SOURCE_VERSION) {
        return process.env.CODEBUILD_RESOLVED_SOURCE_VERSION.toString().trim().slice(0, 6);
    }
    console.error('Env CODEBUILD_RESOLVED_SOURCE_VERSION empty');
    return 'commit-unknown';
})();
console.log(`GIT REF: ${gitRef}`);

const buildCommonConfig: () => UserConfig = () => ({
    appType: 'spa',
    root: '.',
    publicDir: path.join(__dirname, 'static'),

    resolve: {
        alias: {
            '@app': '/app',
            '@proto': '/proto/gen',
        },
    },

    define: {
        __VERSION__: JSON.stringify(packageJSON['version'] || '0.0.0'),
        __GITREF__: JSON.stringify(gitRef),
    },

    css: {
        // ??
        devSourcemap: true,
    },

    build: {
        outDir: './build',
        manifest: true,
        rollupOptions: {
            output: {
                manualChunks: (id: string) => {
                    if (id.includes('node_modules')) {
                        const moduleName = id.split('node_modules/')[1].split('/')[0];
                        return `vendor/${moduleName}`;
                    }
                    return undefined;
                },
            },
        },
    },

    server: {
        https: true,
        port: 8443,
        hmr: true,
    },

    plugins: [
        BasicSSLPlugin(),
        // LegacyBrowserPlugin(),
        VuePlugin(),
        NodePolyfillsPlugin(),
    ],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(async ({ command, mode, ssrBuild }) => {
    const config = buildCommonConfig();
    return config;
});
