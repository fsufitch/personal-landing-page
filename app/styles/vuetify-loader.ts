import type * as Vuetify from 'vuetify';

type VuetifyOptions = NonNullable<Parameters<typeof Vuetify.createVuetify>[0]>;

export const createVuetify = async (dryRun?: boolean) => {
    const options: VuetifyOptions = {};

    options.theme = await getVuetifyThemeOption();

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
const getVuetifyThemeOption = async () => ({
    themes: {
        light: {
            dark: false,
            colors: {
                primary: '#3f51b5',
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
        },
        dark: {
            dark: true,
            colors: {
                primary: '#3f51b5',
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#b71c1c',
            },
        },
    },
});
