<script setup lang="ts">
import { computed } from 'vue';

const ReElement = (await import('@app/components/markdown/ReElement.vue')).default;

const props = defineProps<{ node: HTMLElement }>();
const $start = computed(() => parseInt(props.node.getAttribute('start') || '1'));

const $childNodes = computed(() =>
    Array.from(props.node.childNodes)
        .filter((child) => child.nodeName.toLowerCase() === 'li')
        .map((child) => Array.from(child.childNodes)),
);
</script>

<template>
    <component :is="props.node.tagName" :start="$start">
        <li v-for="(renderChildren, idx) of $childNodes" :key="idx">
            <component :is="ReElement" v-for="(renderChild, idx2) of renderChildren" :key="idx2" :node="renderChild" />
        </li>
    </component>
</template>

<style lang="scss">
ul,
ol {
    margin-left: 2em;
    margin-bottom: 1em;
}
</style>
