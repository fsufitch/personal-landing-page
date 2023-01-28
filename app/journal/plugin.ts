import { App, ref } from 'vue';
import { Journal } from './journal';

export const INJECT_JOURNAL_BASE_URL = 'JOURNAL_BASE_URL';
export const INJECT_JOURNAL = 'JOURNAL';

export const JournalPlugin = {
    $journalBaseURL: ref<string>(''),
    $journal: ref<Journal>(),

    install(vueApp: App, options: { baseURL: string }) {
        this.$journalBaseURL.value = options.baseURL;
        vueApp.provide(INJECT_JOURNAL_BASE_URL, this.$journalBaseURL);
        vueApp.provide(INJECT_JOURNAL, this.$journal);
    },
};
