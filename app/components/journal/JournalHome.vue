<script setup lang="ts">
import { getDefaultJournal } from './service';
import { ref, watchEffect, computed, watch } from 'vue';
import { Journal } from '@app/journal/journal';
import { JournalIndex } from '@proto/journal';

const $journal = ref<Journal | undefined>();
watchEffect(async () => ($journal.value = (await getDefaultJournal()).journal));

const $journalIndex = ref<JournalIndex | undefined>();
watch($journal, async () => ($journalIndex.value = await $journal?.value?.index()));

const $categoryKeys = computed(() => Object.keys($journalIndex.value?.categories || {}));
</script>

<template>
    <p style="margin-top: 50%">hello</p>
    <p v-for="key in $categoryKeys" :key="key">category: {{ key }}</p>
</template>
