import { Journal } from '@app/journal/journal';

const JOURNAL_CACHE: { [baseURL: string]: Journal } = {};

export const getJournal = (baseURL: string, forceInit = false) => {
    while (baseURL.endsWith('/')) {
        baseURL = baseURL.slice(0, baseURL.length - 1);
    }
    if (forceInit || !JOURNAL_CACHE[baseURL]) {
        const j = new Journal(baseURL);
        JOURNAL_CACHE[baseURL] = j;
    }
    return JOURNAL_CACHE[baseURL];
};

export const getDefaultJournalURL = () => {
    const baseURL = new URL(window.location.href);
    baseURL.pathname = '';
    return baseURL.toString();
};
