<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const setMetadata = (keyProp: string, keyValue: string, valueProp: string, valueValue: string) => {
    let elem = document.querySelector(`meta[${keyProp}='${keyValue}']`);
    if (!elem) {
        elem = document.createElement('meta');
        elem.setAttribute(keyProp, keyValue);
        document.querySelector('head')?.prepend(elem);
    }
    elem.setAttribute(valueProp, valueValue);
};

const deleteMetadata = (keyProp: string, keyValue: string) => {
    let elem = document.querySelector(`meta[${keyProp}='${keyValue}']`);
    if (elem) {
        elem.remove();
    }
};

interface PageMetaProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    pageType?: string;
}

const defaultImage = '/favicon.png';

const renderProps = ({ props }: { props: PageMetaProps }) => {
    // Meta Tags Generated via http://heymeta.com
    console.log(props);

    // Google
    setMetadata('itemprop', 'name', 'content', props.title);
    setMetadata('itemprop', 'description', 'content', props.description);
    setMetadata('itemprop', 'image', 'content', props.image || defaultImage);

    // Facebook/Meta
    // https://ogp.me
    setMetadata('property', 'og:title', 'content', props.title);
    setMetadata('property', 'og:description', 'content', props.description);
    setMetadata('property', 'og:url', 'content', props.url || window.location.toString());
    setMetadata('property', 'og:image', 'content', props.image || defaultImage);
    if (props.pageType) {
        setMetadata('property', 'og:type', 'content', props.pageType);
    } else {
        deleteMetadata('property', 'og:type');
    }

    // Twitter
    setMetadata('name', 'twitter:card', 'content', 'summary_large_image');
    setMetadata('name', 'twitter:title', 'content', props.title);
    setMetadata('name', 'twitter:description', 'content', props.description);
    setMetadata('name', 'twitter:image', 'content', props.image || defaultImage);
};

const props = defineProps<PageMetaProps>();
const route = useRoute();

renderProps({ props });
watch(() => ({ props, route }), renderProps);
</script>

<template>
    <span>
        <!-- nothing here, this is a component to use just for affecting page meta -->
    </span>
</template>
