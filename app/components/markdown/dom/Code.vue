<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { hljsWithLanguage } from '@hljs-lazy/index';

const props = defineProps<{ node: HTMLPreElement; onRender?: (language: string, output: string) => void }>();
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

const originalProps = Object.fromEntries([...props.node.attributes].map(({ name, value }) => [name, value]));
</script>

<template>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <code v-if="$highlightedCode" v-bind="originalProps" class="hljs" v-html="$highlightedCode" />
    <code v-else v-bind="originalProps" class="hljs"><slot /></code>
</template>

<style lang="scss">
pre {
    margin-top: 1em;
}

:not(pre) > code {
    display: inline-block;
}
</style>
