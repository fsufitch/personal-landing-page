<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import { computed } from 'vue';
import ReElement from './ReElement.vue';

import { useMDAlert } from './dom/Alert.vue';

let MD = new MarkdownIt('default');
MD = useMDAlert(MD);

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
    <ReElement v-for="(node, idx) of $nodes" :key="idx" :node="node" />
</template>
