<script setup lang="ts">
import { useJournal } from '@app/journal/journal';
import { JournalIndex } from '@proto/journal';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const props = defineProps<{ node: HTMLAnchorElement }>();

const route = useRoute();
const $articleID = computed(() => (route.params['articleID'] || '').toString());

const $journal = useJournal();
const $journalIndex = ref<JournalIndex>();
watch($journal, async (journal) => ($journalIndex.value = await journal?.index()));

const $href = computed(() => props.node.getAttribute('href') || '');

const $link = computed(() =>
    $href.value.match('^[a-z]+://')
        ? ['direct', $href.value]
        : $href.value.startsWith('#')
        ? ['anchor', $href.value]
        : $href.value.startsWith('/')
        ? ['route', $href.value]
        : ['attachment', $journal.value?.fileURL($articleID.value, $href.value)],
);
</script>

<template>
    <a v-if="$link[0] === 'direct' && $link[1]" :href="$link[1]">
        <slot /><sup><VIcon icon="mdi-open-in-new" /></sup>
    </a>

    <a v-else-if="$link[0] === 'anchor' && $link[1]" :href="$link[1]">
        <slot /><sup><VIcon icon="mdi-pound" /></sup>
    </a>

    <RouterLink v-else-if="$link[0] === 'route' && $link[1]" :to="$link[1]"> <slot /> </RouterLink>

    <a v-else-if="$link[0] === 'attachment' && $link[1]" :href="$link[1]">
        <slot /><sup><VIcon icon="mdi-cloud-download" /></sup>
    </a>

    <RouterLink v-else to="/page-not-found">
        <slot /><sup><VIcon icon="mdi-link-variant-off" /></sup>
    </RouterLink>
</template>
