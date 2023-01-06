import { Journal } from '@app/journal/journal';

const JOURNAL_CACHE: { [baseURL: string]: Journal } = {};

export const getJournal = (baseURL: string, forceInit = false) => {
    while (baseURL.endsWith('/')) {
        baseURL = baseURL.slice(0, baseURL.length - 1);
    }
    if (forceInit || !JOURNAL_CACHE[baseURL]) {
        console.log('Initialize journal from', baseURL);
        JOURNAL_CACHE[baseURL] = new Journal(baseURL);
    }
    return JOURNAL_CACHE[baseURL];
};

export const getActiveJournalInfo = () => {
    let url: string;

    const urlFromParams = new URLSearchParams(window.location.search).get('j');
    if (urlFromParams) {
        url = urlFromParams;
    } else if (Object.hasOwn(globalThis, '__JOURNAL_BASE_URL__') && __JOURNAL_BASE_URL__) {
        url = __JOURNAL_BASE_URL__;
    } else {
        const rootURL = new URL(window.location.href);
        rootURL.pathname = '';
        url = rootURL.toString();
    }
    return { url, journal: getJournal(url) };
};
