import { Journal } from '@app/journal/journal';

const JOURNAL_CACHE: { [baseURL: string]: Journal } = {};

export const getJournal = (baseURL: string, forceInit = false) => {
    while (baseURL.endsWith('/')) {
        baseURL = baseURL.slice(0, baseURL.length - 1);
    }
    if (forceInit || !JOURNAL_CACHE[baseURL]) {
        console.info('Initialize journal from', baseURL);
        JOURNAL_CACHE[baseURL] = new Journal(baseURL);
    }
    return JOURNAL_CACHE[baseURL];
};

export const getActiveJournalInfo = () => {
    let url: string;

    const urlFromParams = new URLSearchParams(window.location.search).get('j');
    if (urlFromParams) {
        url = urlFromParams;
    } else if (__JOURNAL_BASE_URL__) {
        url = __JOURNAL_BASE_URL__;
    } else {
        const rootURL = new URL(window.location.href);
        rootURL.pathname = '';
        url = rootURL.toString();
    }
    return { url, journal: getJournal(url) };
};

export interface ArticleAttachmentRaw {
    url: string;
    mimeType?: string;
    data: unknown;
}
export const readArticleAttachmentRaw = async (
    journal: Journal,
    articleID: string,
    attachmentName: string,
): Promise<ArticleAttachmentRaw> => {
    const article = await journal.article(articleID);
    const attachment = article.attachments[attachmentName];
    if (!attachment) {
        throw `Attachment not found; article='${articleID}' attachment='${attachmentName}'`;
    }

    const { url, response } = await (attachment.filePath
        ? journal.attachment(articleID, attachment.filePath)
        : attachment.url
        ? journal.externalAttachment(attachment.url)
        : (() => {
              throw `Article attachment had neither filePath or url; article='${articleID}' attachment=${attachmentName}`;
          })());

    const mimeType = attachment.mimetype || response.headers['Content-Type'];
    if (!mimeType) {
        console.warn(
            'Article attachment did not have a mime type (metadata or query header)',
            articleID,
            attachmentName,
        );
    }

    return { url, mimeType, data: response.data };
};
