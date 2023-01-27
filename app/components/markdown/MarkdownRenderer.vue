<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import MarkdownItEmoji from 'markdown-it-emoji';
import { computed } from 'vue';
import ReElement from './ReElement.vue';

import { useMDAlert } from './dom/Alert.vue';
import { useMDImageCard } from './dom/ImageCard.vue';

let MD = new MarkdownIt('default').use(MarkdownItEmoji);
MD = useMDAlert(MD);
MD = useMDImageCard(MD);

interface Props {
    content: string;
}
const props = defineProps<Props>();
const $renderedContent = computed(() => MD.render(props.content, {}));

const $nodes = computed(() => {
    const rawHTML = $renderedContent.value;
    // console.debug('Raw HTML:', rawHTML);
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

<style>
p:not(:first-of-type) {
    margin-top: 1em;
}
</style>
