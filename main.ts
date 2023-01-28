import * as Vue from 'vue';

import 'vuetify/styles';
import * as Vuetify from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import { GesturePlugin } from '@vueuse/gesture';

import App from '@app/App.vue';
import ROUTER from '@app/router';
import { ThemingPlugin } from '@app/theming';

const initVuetify = () =>
    Vuetify.createVuetify({
        components,
        directives,
        aliases,
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
            },
        },
        theme: {
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
        },
    });

async function main() {
    const app = Vue.createApp(App);
    const vuetify = initVuetify();

    app.use(vuetify);
    app.use(ThemingPlugin, { vuetify });
    app.use(ROUTER);
    app.use(GesturePlugin);

    app.mount('#app-wrapper');
}

main();
