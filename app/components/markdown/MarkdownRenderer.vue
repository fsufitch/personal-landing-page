<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import { computed } from 'vue';
import ReElement from './ReElement.vue';
const MD = new MarkdownIt('commonmark');

interface Props {
    content: string;
}
const props = defineProps<Props>();
const $renderedContent = computed(() => MD.render(props.content, {}));

const $nodes = computed(() => {
    const rawHTML = $renderedContent.value;
    const el = document.createElement('main');
    el.innerHTML = rawHTML;
    const nodeArray = Array.from(el.childNodes);
    return nodeArray;
});
</script>

<template>
    <ReElement v-for="(node, idx) of $nodes" :key="idx" :node="node" />
</template>
