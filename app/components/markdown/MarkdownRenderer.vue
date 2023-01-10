<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import { computed } from 'vue';

import hljs from 'highlight.js';

import ReElement from './ReElement.vue';

import { useMDAlert } from './dom/Alert.vue';
import { useMDImageCard } from './dom/ImageCard.vue';

let MD = new MarkdownIt('default');
MD = useMDAlert(MD);
MD = useMDImageCard(MD);
MD.options.highlight = (str, lang) => {
    const language = lang ? hljs.getLanguage(lang) : undefined;
    if (language) {
        try {
            return (
                '<pre class="hljs"><code>' +
                hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                '</code></pre>'
            );
        } catch (err) {
            console.error('Failed to highlight code', err);
        }
    }
    return `<pre class="hljs"><code>${MD.utils.escapeHtml(str)}</code></pre>\n`;
};

interface Props {
    content: string;
}
const props = defineProps<Props>();
const $renderedContent = computed(() => MD.render(props.content, {}));

const $nodes = computed(() => {
    const rawHTML = $renderedContent.value;
    console.log(rawHTML);
    const el = document.createElement('main');
    el.innerHTML = rawHTML;
    const nodeArray = Array.from(el.childNodes);
    return nodeArray;
});
</script>

<template>
    <Suspense>
        <ReElement v-for="(node, idx) of $nodes" :key="idx" :node="node" />
    </Suspense>
</template>
