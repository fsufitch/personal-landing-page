import { Axios, AxiosResponse } from 'axios';
import { URLBuilder } from './url-builder';
import YAML from 'yaml';
import { JournalIndex } from '@proto/journal';
import { ArticleIndex } from '@proto/article';
import { ref, Ref, watch } from 'vue';

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

    private _index: { loading: boolean; ref: Ref<JournalIndex | undefined> } = { loading: false, ref: ref() };
    index = () => {
        if (this._index.loading || this._index.ref.value) {
            return this._index.ref;
        }
        this._index.loading = true;
        this.axios
            .get(this.indexURL())
            .then((response) => JournalIndex.fromJSON(YAML.parse(response.data.toString())))
            .then(
                (index) => {
                    this._index.loading = false;
                    this._index.ref.value = index;
                },
                (err) => {
                    this._index.loading = false;
                    this._index.ref.value = undefined;
                    console.error('error getting journal index', err);
                },
            );
        return this._index.ref;
    };

    private _files: { [url: string]: { loading: boolean; ref: Ref<AxiosResponse | undefined> } } = {};
    file = (articleID: string, path: string) => {
        const url = this.fileURL(articleID, path);
        const file = (this._files[url] = this._files[url] || { loading: false, ref: ref() });
        if (file.loading || file.ref.value) {
            return file.ref;
        }
        file.loading = true;
        this.axios.get(url).then(
            (response) => {
                file.loading = false;
                file.ref.value = response;
            },
            (err) => {
                file.loading = false;
                file.ref.value = undefined;
                console.error('error getting file', url, err);
            },
        );
        return file.ref;
    };

    article = (id: string) => {
        const article: Ref<ArticleIndex | undefined> = ref();
        watch(
            this.file(id, 'article.yaml'),
            (response) => response && (article.value = ArticleIndex.fromJSON(YAML.parse(response.data.toString()))),
        );
        return article;
    };
}
