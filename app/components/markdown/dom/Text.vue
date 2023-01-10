<script setup lang="ts">
const props = defineProps<{ node: Text }>();
</script>

<template>
    {{ props.node.textContent }}
</template>
