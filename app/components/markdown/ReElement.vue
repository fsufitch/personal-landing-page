<script setup lang="ts">
import { defineProps, computed } from 'vue';
import E from './dom/index';

const props = defineProps<{ node: Node }>();
const $C = computed(() => {
    const nodeName = props.node.nodeName.toLowerCase();
    if (!E[nodeName]) {
        console.warn('Unknown node', props.node);
        return { component: nodeName, isCustomComponent: false };
    }

    if (typeof E[nodeName] === 'string') {
        return { component: E[nodeName], isCustomComponent: false };
    }

    return {
        component: E[nodeName],
        isCustomComponent: true,
    };
});

const $childNodes = computed(() => Array.from(props.node.childNodes));

const $nodeAttrs = computed(() => {
    if (!(props.node instanceof Element)) {
        return {};
    }
    const attrs: { [k: string]: unknown } = {};
    for (const attr of props.node.getAttributeNames()) {
        attrs[attr] = props.node.getAttribute(attr);
    }
    return attrs;
});
</script>

<template>
    <component :is="$C.component" v-if="$C.isCustomComponent" :node="props.node">
        <ReElement v-for="(child, idx) of $childNodes" :key="idx" :node="child" />
    </component>
    <component :is="$C.component" v-else v-bind="$nodeAttrs">
        <ReElement v-for="(child, idx) of $childNodes" :key="idx" :node="child" />
    </component>
</template>

<style lang="scss">
pre {
    margin: 0.5em;
    margin-left: 1em;
    padding: 1em;
}
</style>
