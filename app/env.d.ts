/// <reference types="vite/client" />

declare module 'vite-plugin-node-stdlib-browser' {
    import { PluginOption } from 'vite';
    const callableModule: () => PluginOption;
    export default callableModule;
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare const __GITREF__: string;
declare const __VERSION__: string;
declare const __JOURNAL_BASE_URL__: string | undefined;
