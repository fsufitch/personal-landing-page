<script setup lang="ts">
import { computed } from 'vue';
import { anchor } from '@app/components/markdown/anchors';

const props = defineProps<{ node: HTMLHeadingElement }>();

const $anchor = computed(() => anchor(`${props.node.nodeName}-${props.node.textContent}`));
</script>

<template>
    <component :is="props.node.nodeName" :id="$anchor" class="align-bottom">
        <VBtn :href="`#${$anchor}`" variant="plain" color="blue" icon="mdi-pound" size="x-small" />
        <slot />
    </component>
</template>
