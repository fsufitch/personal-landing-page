import * as Vue from 'vue';

export interface PageMetadata {
    title: string;
    description: string;
    image?: string;
    url?: string;
    pageType?: string;
}

export const DEFAULT_PAGE_METADATA: PageMetadata = {
    title: 'fsufitch@homepage (Loading...)',
    description:
        "Filip Sufitchi's personal home page. " +
        'This is a placeholder description while the page loads via Javascript.',
};

const $pageMetadata = Vue.ref(DEFAULT_PAGE_METADATA);

export const usePageMetadata = () => $pageMetadata;

const absoluteURL = (url: string) => new URL(url, window.location.href).toString();

export const PageMetadataPlugin = {
    install(_vueApp: Vue.App, options?: { defaultMetadata?: PageMetadata }) {
        if (options?.defaultMetadata) {
            $pageMetadata.value = options.defaultMetadata;
        }
        this.updateMetadataEffect();
        Vue.watch([$pageMetadata], this.updateMetadataEffect);
    },

    updateMetadataEffect() {
        const meta = (keyPropName: string, keyPropValue: string, content: string) => {
            let el = document.querySelector(`meta[${keyPropName}="${keyPropValue}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute(keyPropName, keyPropValue);
                document.querySelector('head')?.append(el);
            }
            el.setAttribute('content', content);
        };

        const title = $pageMetadata.value.title;
        const description = $pageMetadata.value.description;
        const image = absoluteURL($pageMetadata.value.image || '/favicon.png');
        const pageType = $pageMetadata.value.pageType ?? 'website';

        console.debug('Update page meta tags', { title, description, image, pageType });

        // Title tag itself
        const titleTag = document.querySelector('title');
        if (titleTag) {
            titleTag.textContent = title;
        }
        // Google tags
        meta('itemprop', 'name', title);
        meta('itemprop', 'description', description);
        meta('itemprop', 'image', image);

        // Twitter
        meta('name', 'twitter:card', 'summary_large_image');
        meta('name', 'twitter:title', title);
        meta('name', 'twitter:description', description);
        meta('name', 'twitter:image', image);

        // Facebook
        // https://ogp.me
        meta('property', 'og:url', window.location.href);
        meta('property', 'og:type', pageType);
        meta('property', 'og:title', title);
        meta('property', 'og:description', description);
        meta('property', 'og:image', image);
    },
};
