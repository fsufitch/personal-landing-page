<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue';
import { hljsWithLanguage } from '@hljs-lazy/index';

const props = defineProps<{ node: HTMLPreElement; onRender?: (language: string, output: string) => void }>();
const $language = ref('');
const $highlightedCode = ref<string>(props.node.textContent || '');

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
const isInline = computed(() => props.node.parentElement?.tagName !== 'PRE');
</script>

<template>
    <!-- eslint-disable vue/no-v-html vue/no-v-text-v-html-on-component -->
    <VAlert
        v-if="!isInline"
        tag="code"
        variant="elevated"
        elevation="1"
        class="hljs"
        v-bind="originalProps"
        v-html="$highlightedCode"
    />
    <VAlert
        v-else
        tag="code"
        variant="elevated"
        elevation="1"
        v-bind="originalProps"
        class="hljs inline-code"
        v-html="$highlightedCode"
    />
</template>

<style lang="scss">
@use 'vuetify';
@use 'sass:meta';

pre {
    margin-top: 1em;
}

.inline-code {
    display: inline;
}

html[data-theme='light'] {
    @include meta.load-css('highlight.js/scss/base16/humanoid-light.scss');
}

html[data-theme='dark'] {
    @include meta.load-css('highlight.js/scss/base16/dark-violet.scss');
}
</style>
