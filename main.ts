import * as Vue from 'vue';

import * as Vuetify from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from '@app/App.vue';
import ROUTER from '@app/router';

const vuetify = async () => Vuetify.createVuetify({
  components,
  directives,
});

async function main() {
    const app = Vue.createApp(App);
    app.use(await vuetify())
    app.use(ROUTER);
    app.mount('#app-wrapper');
}

main();