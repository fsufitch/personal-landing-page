<script setup lang="ts">
import { createDots, DEFAULT_DOTS } from '@app/styles/gridspinner';
import { useAttrs, ref, onMounted } from 'vue';
import { useTheme } from 'vuetify/lib/framework.mjs';
const props = defineProps<{ dots?: number; color?: string }>();
const theme = useTheme();

const dots = props.dots || DEFAULT_DOTS;

const color: string = !props.color
    ? theme.current.value.colors.primary
    : theme.current.value.colors[props.color || ''] || props.color;

const attrs = useAttrs();

const $container = ref<{ $el: Element }>();

onMounted(() => {
    console.log('.asdfasdfasdfasd', $container.value);
    if (!$container.value) {
        return;
    }
    createDots($container.value.$el, dots);
});
</script>

<template>
    <VSheet ref="$container" tag="div" v-bind="attrs" class="gridspinner"></VSheet>
</template>

<style lang="scss">
@import '@app/styles/gridspinner';

div.gridspinner {
    @include gridspinner(v-bind(color), v-bind(dots));

    aspect-ratio: 1;
}
</style>
