import { Axios } from 'axios';
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

    index = this.cachedAsync(async () => {
        const url = this.urlb.addPath(['journal.yaml']).toString();
        const response = await this.axios.get(url);
        const journal = JournalIndex.fromJSON(YAML.parse(response.data.toString()));
        console.debug(`Loaded journal index from: ${response.config.url}`, JournalIndex.toJSON(journal));
        return journal;
    });

    article = (id: string) =>
        this.cachedAsync(async () => {
            const response = await this.articleFile(id, 'article.yaml');
            const article = ArticleIndex.fromJSON(YAML.parse(response.data.toString()));
            console.debug(`Loaded article:`, ArticleIndex.toJSON(article));
            return article;
        })();

    articleFile = (articleID: string, path: string) =>
        this.cachedAsync(async () => {
            const url = this.urlb.addPath(['articles', articleID, ...path.split('/')]).toString();
            const response = await this.axios.get(url);
            console.debug(`Loaded file from: ${url}, ${response.data.toString().length} bytes`);
            return response;
        })();
}
