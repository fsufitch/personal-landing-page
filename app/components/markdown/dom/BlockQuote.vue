<script setup lang="ts">
// const props = defineProps<{ node: Node }>();
</script>

<template>
    <blockquote class="re-bq text-body-2">
        <slot />
    </blockquote>
</template>

<style>
blockquote.re-bq {
    margin: 1em;
    padding: 0.5em;
    padding-left: 1em;
    border-left: thin solid lightgray;
    font-style: italic;
}
</style>
