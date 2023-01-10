import { Axios, AxiosResponse } from 'axios';
import { URLBuilder } from './url-builder';
import YAML from 'yaml';
import { JournalIndex } from '@proto/journal';
import { ArticleIndex } from '@proto/article';

export class Journal {
    private axios: Axios;
    private urlb: URLBuilder;
    constructor(public baseURL: string) {
        this.urlb = new URLBuilder(baseURL);
        this.axios = new Axios({ validateStatus: (status) => status < 300 });
    }

    private cachedAsync<T>(fn: () => Promise<T>): () => Promise<T> {
        const container: { value?: T } = {};
        return async () => {
            if (container.value === undefined) {
                container.value = await fn();
            }
            return container.value;
        };
    }

    indexURL = () => this.urlb.addPath(['journal.yaml']).toString();
    articleURL = (articleID: string) => this.fileURL(articleID, 'article.yaml');
    fileURL = (articleID: string, path: string) =>
        this.urlb.addPath(['articles', articleID, ...path.split('/')]).toString();

    private _getCache: { [url: string]: Promise<AxiosResponse> } = {};
    private _get(url: string, options?: { force?: boolean }) {
        if (options?.force || !this._getCache[url]) {
            this._getCache[url] = this.axios.get(url);
        }
        return this._getCache[url];
    }

    private _index: Promise<JournalIndex> | undefined;
    index = (options?: { force?: boolean }) => {
        if (options?.force || !this._index) {
            this._index = this._get(this.indexURL(), { force: options?.force }).then((response) =>
                JournalIndex.fromJSON(YAML.parse(response.data.toString())),
            );
        }
        return this._index;
    };

    private _articles: { [id: string]: Promise<ArticleIndex> } = {};
    article = (articleID: string, options?: { force?: boolean }) => {
        if (options?.force || !this._articles[articleID]) {
            this._articles[articleID] = this._get(this.articleURL(articleID), { force: options?.force }).then(
                (response) => ArticleIndex.fromJSON(YAML.parse(response.data.toString())),
            );
        }
        return this._articles[articleID];
    };

    private _attachments: { [url: string]: Promise<{ url: string; response: AxiosResponse }> } = {};
    attachment = (articleID: string, path: string, options?: { force?: boolean }) => {
        const url = this.fileURL(articleID, path);
        if (options?.force || !this._attachments[url]) {
            this._attachments[url] = this._get(url).then((response) => ({ url, response }));
        }
        return this._attachments[url];
    };

    externalAttachment = (url: string, options?: { force?: boolean }) => {
        if (options?.force || !this._attachments[url]) {
            this._attachments[url] = this._get(url).then((response) => ({ url, response }));
        }
        return this._attachments[url];
    };
}
