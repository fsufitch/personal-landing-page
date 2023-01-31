import { App, computed, inject, Ref, ref, watch } from 'vue';
import { ThemeInstance } from 'vuetify/lib/framework.mjs';
import {
    saveThemeToStorage,
    AppTheme,
    loadThemeFromStorage,
    getVuetifyThemeKey,
    VuetifyThemeKey,
} from '@app/styles/themes';

// Constants and types
const VUE_INJECT_THEME = 'APP_THEME';
const VUE_INJECT_VUETIFY_THEME = 'APP_VUETIFY_THEME';

export const ThemingPlugin = {
    install(vueApp: App, options?: { vuetify?: { theme?: ThemeInstance } }) {
        // The theme instance is actually rquired, regardless of what the type signature says
        if (!options?.vuetify?.theme) {
            throw 'Theming plugin did not receive a Vuetify ThemeInstance';
        }
        const vuetifyThemeInstance = options.vuetify.theme;

        // Reactive theme state
        const $theme = ref(loadThemeFromStorage());
        const $vuetifyTheme = computed(() => getVuetifyThemeKey($theme.value));

        watch([$theme], ([theme]) => this.onThemeUpdated(theme));

        this.onVuetifyThemeUpdated($vuetifyTheme.value, options.vuetify.theme);
        watch([$vuetifyTheme], ([vTheme]) => this.onVuetifyThemeUpdated(vTheme, vuetifyThemeInstance));

        vueApp.provide(VUE_INJECT_THEME, $theme);
        vueApp.provide(VUE_INJECT_VUETIFY_THEME, $vuetifyTheme);

        console.info(`Loaded custom theming; theme=${$theme.value} vuetifyTheme=${$vuetifyTheme.value}`);
    },

    // Actions to perform then the app theme is modified
    onThemeUpdated: (theme: AppTheme) => {
        saveThemeToStorage(theme);
    },

    // Actions to perform when the app theme *key* (light/dark) is modified
    onVuetifyThemeUpdated: (vTheme: VuetifyThemeKey, vThemeInstance: ThemeInstance) => {
        console.debug('Vuetify theme updated:', vTheme);
        document.querySelector('html')?.setAttribute('data-theme', vTheme);
        vThemeInstance.global.name.value = vTheme;
    },
};

export const useAppTheme = () => ref(inject<Ref<AppTheme>>(VUE_INJECT_THEME));
export const useVuetifyTheme = () => ref(inject<Ref<VuetifyThemeKey>>(VUE_INJECT_VUETIFY_THEME));
