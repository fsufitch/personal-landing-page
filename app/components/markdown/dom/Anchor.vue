<script setup lang="ts">
import { getActiveJournalInfo } from '@app/components/journal/service';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const props = defineProps<{ node: HTMLAnchorElement }>();

const route = useRoute();
const $articleID = computed(() => (route.params['articleID'] || '').toString());

const $journal = computed(() => getActiveJournalInfo().journal);
const $journalIndex = ref(await $journal.value.index());
watch($journal, async (journal) => ($journalIndex.value = await journal.index()));

const $href = computed(() => props.node.getAttribute('href') || '');
const $directHref = computed(() => ($href.value && $href.value.match('^[a-z]+://') ? $href.value : ''));
const $routerTo = computed(() => (!$directHref.value && $href.value.startsWith('/') ? $href.value : ''));
const $attachmentHref = computed(() =>
    !$directHref.value && !$routerTo.value && $articleID.value
        ? $journal.value.fileURL($articleID.value, $href.value)
        : '',
);
</script>

<template>
    <a v-if="$directHref" :href="$directHref"> <slot /> </a>
    <RouterLink v-else-if="$routerTo" :to="$routerTo"> <slot /> </RouterLink>
    <a v-else-if="$attachmentHref" :href="$attachmentHref"> <slot /> </a>
    <RouterLink v-else to="/page-not-found"> <slot /> </RouterLink>
</template>
