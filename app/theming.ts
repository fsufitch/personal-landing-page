import { App, computed, inject, Ref, ref, watch } from 'vue';
import { ThemeInstance } from 'vuetify/lib/framework.mjs';

// Constants and types
const VUE_INJECT_THEME = 'APP_THEME';
const VUE_INJECT_VUETIFY_THEME = 'APP_VUETIFY_THEME';
const THEME_STORAGE = 'theme';
export enum Theme {
    system = 'browser-preference',
    light = 'light-theme',
    dark = 'dark-theme',
}
export enum VuetifyTheme {
    light = 'light',
    dark = 'dark',
}

export const ThemingPlugin = {
    install(vueApp: App, options?: { vuetify?: { theme?: ThemeInstance } }) {
        // The theme instance is actually rquired, regardless of what the type signature says
        if (!options?.vuetify?.theme) {
            throw 'Theming plugin did not receive a Vuetify ThemeInstance';
        }
        const vuetifyThemeInstance = options.vuetify.theme;

        // Reactive theme state
        const $theme = ref(this.getThemeFromStorage());
        const $vuetifyTheme = computed(() => this.getVuetifyTheme($theme.value));

        watch([$theme], ([theme]) => this.onThemeUpdated(theme));

        this.onVuetifyThemeUpdated($vuetifyTheme.value, options.vuetify.theme);
        watch([$vuetifyTheme], ([vTheme]) => this.onVuetifyThemeUpdated(vTheme, vuetifyThemeInstance));

        vueApp.provide(VUE_INJECT_THEME, $theme);
        vueApp.provide(VUE_INJECT_VUETIFY_THEME, $vuetifyTheme);

        console.info(`Loaded custom theming; theme=${$theme.value} vuetifyTheme=${$vuetifyTheme.value}`);
    },

    getThemeFromStorage: () => {
        let value: unknown = null;
        try {
            value = JSON.parse(sessionStorage.getItem(THEME_STORAGE) || 'null');
        } catch (err) {
            console.debug('Could not load theme from storage', err);
        }
        for (const [, v] of Object.entries(Theme)) {
            if (value === v) {
                console.debug('Valid theme found in storage:', value);
                return v;
            }
        }
        console.debug('Invalid theme found in storage, using default; found:', value);
        return Theme.system;
    },

    getVuetifyTheme: (t: Theme) => {
        return {
            [Theme.system]: getSystemVuetifyTheme(),
            [Theme.light]: VuetifyTheme.light,
            [Theme.dark]: VuetifyTheme.dark,
        }[t];
    },

    // Actions to perform then the app theme is modified
    onThemeUpdated: (theme: Theme) => {
        console.debug('Theme updated:', theme);
        sessionStorage.setItem(THEME_STORAGE, JSON.stringify(theme));
    },

    // Actions to perform when the app theme *name* (light/dark) is modified
    onVuetifyThemeUpdated: (vTheme: VuetifyTheme, vThemeInstance: ThemeInstance) => {
        console.debug('Vuetify theme updated:', vTheme);
        document.querySelector('html')?.setAttribute('data-theme', vTheme);
        vThemeInstance.global.name.value = vTheme;
    },
};

export const getSystemVuetifyTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? VuetifyTheme.dark : VuetifyTheme.light;

export const useAppTheme = () => ref(inject<Ref<Theme>>(VUE_INJECT_THEME));
export const useVuetifyTheme = () => ref(inject<Ref<VuetifyTheme>>(VUE_INJECT_VUETIFY_THEME));
