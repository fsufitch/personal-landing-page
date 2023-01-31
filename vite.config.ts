import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

import { defineConfig, UserConfig } from 'vite';

import BasicSSLPlugin from '@vitejs/plugin-basic-ssl';
import VuePlugin from '@vitejs/plugin-vue';
import DynamicImportVarsPlugin from '@rollup/plugin-dynamic-import-vars';

import NodePolyfillsPlugin from 'vite-plugin-node-stdlib-browser';
import VuetifyPlugin from 'vite-plugin-vuetify';

const packageJSONRaw = fs.readFileSync(path.join(__dirname, 'package.json')).toString();
const packageJSON = JSON.parse(packageJSONRaw);

const gitRef = async () => {
    try {
        const gitRef = child_process.execSync('git rev-parse HEAD').toString().trim().slice(0, 6);
        console.info(`GIT ref from CLI: ${gitRef}`);
        return gitRef;
    } catch (exc) {
        console.warn('Could not get git ref from CLI', exc);
    }

    if (process.env.CODEBUILD_RESOLVED_SOURCE_VERSION) {
        const gitRef = process.env.CODEBUILD_RESOLVED_SOURCE_VERSION.toString().trim().slice(0, 6);
        console.info(`GIT ref from Codebuild env: ${gitRef}`);
        return gitRef;
    }
    console.error('Could not resolve git ref');
    return 'commit-unknown';
};

const hljsLanguages = async () => {
    console.info('Loading HLJS language index');
    const hljs = (await import('highlight.js')).default;
    const languages = hljs.listLanguages();
    console.info(`    ${languages.length} languages`);
    return languages;
};

const vuetifyDefaultThemes = async () => {
    const { createVuetify: getVuetify } = await import('./app/styles/vuetify-loader');
    const vuetifyInstance = await getVuetify(true);
    return vuetifyInstance.theme.themes.value;
};

// const hljsLanguageAliases = async () => {
//     const hljs = (await import('highlight.js')).default;
//     const languages = hljs.listLanguages();
//     return Object.fromEntries(
//         languages.map((lang) => [
//             `highlight.js/lib/language/${lang}`,
//             `/node_modules/highlight.js/lib/language/${lang}.js`,
//         ]),
//     );
// };

const buildCommonConfig: () => Promise<UserConfig> = async () => ({
    appType: 'spa',
    root: '.',
    publicDir: path.join(__dirname, 'static'),

    resolve: {
        alias: {
            '@app': '/app',
            '@proto': '/proto/gen',
            '@hljs-lazy': '/hljs-lazy',
            // ...(await hljsLanguageAliases()),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.css'],
    },

    define: {
        __VERSION__: JSON.stringify(packageJSON['version'] || '0.0.0'),
        __GITREF__: JSON.stringify(await gitRef()),
        __JOURNAL_BASE_URL__: JSON.stringify(process.env?.JOURNAL_BASE_URL ?? ''),
        __HLJS_LANGUAGES__: JSON.stringify(await hljsLanguages()),
        __DEFAULT_THEMES__: JSON.stringify(await vuetifyDefaultThemes()),
    },

    css: {
        // ??
        devSourcemap: true,
    },

    build: {
        outDir: './build',
        manifest: true,
        target: 'esnext',
        rollupOptions: {
            plugins: [DynamicImportVarsPlugin()],

            output: {
                manualChunks: (id: string) => {
                    if (id.includes('hljs-lazy')) {
                        const p = path.parse(id);
                        const langName = p.name.split('.')[0];
                        return `@hljs-lazy/${langName}`;
                    }
                    return null;
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
        VuetifyPlugin(),
    ],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineConfig(async ({ command, mode, ssrBuild }) => {
    const config = buildCommonConfig();
    return config;
});
