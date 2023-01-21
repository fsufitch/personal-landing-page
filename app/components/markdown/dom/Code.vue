<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { hljsWithLanguage } from '@hljs-lazy/index';
// const hljsLanguages = Object.fromEntries(
//     __HLJS_LANGUAGES__
//         .map((lang) => ({
//             lang,
//             func: async () => {
//                 console.log('loading hljs lang', lang);
//                 return (await import(`node_modules/highlight.js/lib/languages/${lang}.js`)).default;
//             },
//         }))
//         .map(({ lang, func }) => [lang, func]),
// );

const props = defineProps<{ node: HTMLPreElement; onRender?: (language: string, output: string) => void }>();

// const importHighlightLanguage = (lang: string) => import(`highlight.js/es/languages/${lang}.js`);

const $language = ref('');
const $highlightedCode = ref<string>('');

const renderHighlightedCode = async () => {
    const classAttr = (props.node.getAttribute('class') || '').toString();
    const language = classAttr
        .split(' ')
        .filter((cls) => cls.startsWith('language-'))
        .concat('')[0]
        .slice('language-'.length);

    if (!language) {
        console.debug('No highlight language received', props.node);
        return;
    }

    const hljs = await hljsWithLanguage(language);
    if (!hljs.getLanguage(language)) {
        console.error('Unsupported language', language);
        return;
    }

    const code = props.node.textContent || '';
    const output = hljs.highlight(code, { language }).value;
    console.debug(`Success highlight.js; lang=${language}; in=${code.length}; out=${output.length} `, props.node);

    $language.value = language;
    $highlightedCode.value = output;
};

watchEffect(renderHighlightedCode);

const outputProps = Object.assign(
    {},
    Object.fromEntries(props.node.getAttributeNames().map((k) => [k, props.node.getAttribute(k)])),
    { class: `hljs ${props.node.getAttribute('class')}` },
);
</script>

<template>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <code v-if="$highlightedCode" v-bind="outputProps" v-html="$highlightedCode" />
    <code v-else v-bind="outputProps">
        <slot />
    </code>
</template>

<style>
pre {
    margin-top: 1em;
}
</style>
