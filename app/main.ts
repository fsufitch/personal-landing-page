import * as Vue from 'vue';
import 'vuetify/styles';

import { GesturePlugin } from '@vueuse/gesture';

import App from '@app/App.vue';
import ROUTER from '@app/router';
import { ThemingPlugin } from '@app/theming';
import { JournalPlugin } from '@app/journal/plugin';
import { createVuetify } from '@app/styles/vuetify-loader';
import { PageMetadataPlugin } from './page-metadata';

const getJournalBaseURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('j')) {
        const url = searchParams.get('j');
        searchParams.delete('j');
        window.history.pushState({}, '', searchParams.toString());
        console.debug(`Got journal base URL from 'j' URL parameter:`, url);
        return url;
    }

    if (__JOURNAL_BASE_URL__) {
        return __JOURNAL_BASE_URL__;
    }

    const rootURL = new URL(window.location.href);
    rootURL.pathname = '';
    return rootURL.toString();
};

async function main() {
    const app = Vue.createApp(App);
    const vuetify = await createVuetify();

    app.use(PageMetadataPlugin);
    app.use(vuetify);
    app.use(ThemingPlugin, { vuetify });
    app.use(ROUTER);
    app.use(GesturePlugin);
    app.use(JournalPlugin, { baseURL: getJournalBaseURL() });

    app.mount('#app-wrapper');
    document.getElementById('prevue')?.remove();
}

main();
