import * as Vue from 'vue';

import 'vuetify/styles';
import * as Vuetify from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

import App from '@app/App.vue';
import ROUTER from '@app/router';

const vuetify = async () =>
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
            defaultTheme: 'light',
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
    app.use(await vuetify());
    app.use(ROUTER);
    app.mount('#app-wrapper');
}

main();
