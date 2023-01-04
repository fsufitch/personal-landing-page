import { URL } from 'url';

export class URLBuilder {
    private _url: URL;
    constructor(base: URL | URLBuilder | string) {
        if (base instanceof URLBuilder) {
            base = base.buildURL();
        }
        this._url = new URL('', base);
    }

    buildURL() {
        return new URL('', this._url);
    }

    toString() {
        return this.buildURL().toString();
    }

    getDecodedPath() {
        return this._url.pathname.split('/').map((x) => decodeURIComponent(x));
    }

    private clone(updater: (url: URL) => void) {
        const b = new URLBuilder(this);
        updater(b._url);
        return b;
    }

    // Builder methods

    protocol = (value: string) => this.clone((url) => (url.protocol = value));

    username = (value: string) => this.clone((url) => (url.username = encodeURIComponent(value)));

    password = (value: string) => this.clone((url) => (url.password = encodeURIComponent(value)));

    hostname = (value: string) => this.clone((url) => (url.hostname = encodeURIComponent(value)));

    port = (value: string) => this.clone((url) => (url.port = encodeURIComponent(value)));

    clearPath = () => this.clone((url) => (url.pathname = ''));

    addPath = (parts: string[]) =>
        this.clone((url) => parts.forEach((part) => (url.pathname += '/' + encodeURIComponent(part))));

    clearParams = () => this.clone((url) => (url.search = ''));

    addParams = (params: [string, string][]) =>
        this.clone((url) => params.forEach(([k, v]) => url.searchParams.append(k, v)));

    setParams = (params: [string, string][]) =>
        this.clone((url) => params.forEach(([k, v]) => url.searchParams.set(k, v)));

    delParams = (names: string[]) => this.clone((url) => names.forEach((name) => url.searchParams.delete(name)));

    fragment = (value: string) => this.clone((url) => (url.hash = value));
}
