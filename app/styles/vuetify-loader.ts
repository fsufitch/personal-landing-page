import type * as Vuetify from 'vuetify';
import MATERIAL_THEME from './material-theme';

type VuetifyOptions = NonNullable<Parameters<typeof Vuetify.createVuetify>[0]>;

export const createVuetify = async (dryRun?: boolean) => {
    const options: VuetifyOptions = {};

    options.theme = { themes: getVuetifyThemes() };

    if (!dryRun) {
        options.components = await import('vuetify/components');
        options.directives = await import('vuetify/directives');

        const { aliases: VuetifyMdiAliases, mdi: VuetifyMdi } = await import('vuetify/iconsets/mdi');
        options.aliases = VuetifyMdiAliases;
        options.icons = {
            defaultSet: 'mdi',
            aliases: VuetifyMdiAliases,
            sets: {
                mdi: VuetifyMdi,
            },
        };
    }

    const Vuetify = await import('vuetify');
    return Vuetify.createVuetify(options);
};

// TODO: add nice theming here
const getVuetifyThemes = (): Record<string, Vuetify.ThemeDefinition> => ({
    light: {
        dark: false,
        colors: objectToDashCase(MATERIAL_THEME.schemes.light),
    },
    dark: {
        dark: true,
        colors: objectToDashCase(MATERIAL_THEME.schemes.dark),
    },
});

const stringToDashCase = (it: string) =>
    it.replaceAll(/(([a-z](?=[^a-z]))|([A-Z])(?=[A-Z][^A-Z])|[0-9](?=[^0-9]))/g, '$1-').toLowerCase();

const objectToDashCase = (it: Object) =>
    Object.fromEntries(Object.entries(it).map(([k, v]) => [stringToDashCase(k), v]));
