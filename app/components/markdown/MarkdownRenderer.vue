<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import MarkdownItEmoji from 'markdown-it-emoji';
import { watchEffect, ref } from 'vue';
import ReElement from './ReElement.vue';

import { useMDAlert } from './dom/Alert.vue';
import { useMDImageCard } from './dom/ImageCard.vue';
import { useAside } from './dom/Aside.vue';
import GridSpinner from '@app/components/grid-spinner/GridSpinner.vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

let MD = new MarkdownIt('default').use(MarkdownItEmoji);
MD = useMDAlert(MD);
MD = useMDImageCard(MD);
MD = useAside(MD);

interface Props {
    content: string;
}
const props = defineProps<Props>();

const $loading = ref<'loading' | 'error' | 'ready'>('loading');
const $loadError = ref<string>('');

const $renderedNodes = ref<Node[]>([]);
watchEffect(() => {
    try {
        const rawMarkdown = props.content;
        const rawHTML = MD.render(rawMarkdown);
        const container = document.createElement('main');
        container.innerHTML = rawHTML;
        $renderedNodes.value = Array.from(container.childNodes);
        $loading.value = 'ready';
    } catch (err) {
        $renderedNodes.value = [];
        console.error('Markdown render failure:', err);
        $loading.value = 'error';
        $loadError.value = `${err}`;
    }
});

const $display = useDisplay();
</script>

<template>
    <template v-if="$loading === 'loading'">
        <h2 class="text-center">Rendering Markdown...</h2>
        <VRow>
            <VSpacer />
            <VCol :cols="$display.lgAndUp.value ? 4 : $display.smAndUp.value ? 4 : 8">
                <GridSpinner />
            </VCol>
            <VSpacer />
        </VRow>
    </template>
    <template v-if="$loading === 'ready'">
        <ReElement v-for="(node, idx) of $renderedNodes" :key="idx" :node="node" />
    </template>
    <template v-if="$loading === 'error'"> Error rendering markdown: {{ $loadError }} </template>
</template>

<style>
p:not(:first-of-type) {
    margin-top: 1em;
}
</style>
