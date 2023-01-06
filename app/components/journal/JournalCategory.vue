<script setup lang="ts">
import { getActiveJournalInfo } from './service';
import { ref, computed, watch } from 'vue';
import { Journal } from '@app/journal/journal';
import { JournalIndex } from '@proto/journal';
import PageMetadataInjector from '@app/components/page-meta/PageMetadataInjector.vue';
import ArticleSummaryCard from './ArticleSummaryCard.vue';
import { useRoute } from 'vue-router';

const $journalInfo = computed(() => getActiveJournalInfo());
const $journal = computed(() => $journalInfo.value.journal);

console.log('ji', $journalInfo);
console.log('journal', $journal, $journal.value);

const route = useRoute();
const $categoryID = computed(() => route.params?.categoryID?.toString() || 'all');

const $index = ref(await $journal.value.index());
watch($journal, async (journal) => ($index.value = await journal.index()));

const $displayCategories = computed(() =>
    Object.entries($index.value.categories).filter(([id]) => $categoryID.value === 'all' || $categoryID.value === id),
);

// const $browseCategories = computed(() =>
//     Object.entries($index.value.categories).filter(([, category]) => !category.hidden),
// );

const getDisplayArticles = async (journal: Journal, index: JournalIndex, displayCategoryIDs: string[]) => {
    const articleIDs = displayCategoryIDs.flatMap((id) => index.categories[id].articles);
    const articlesPromises = articleIDs.map((id) => journal.article(id).then((article) => ({ id, article })));
    const articles = await Promise.all(articlesPromises);
    const uniqueArticles = Object.entries(Object.fromEntries(articles.map((obj) => [obj.id, obj.article])));
    uniqueArticles.sort((a1, a2) => (a1[1].createdOn?.getTime() ?? 0) - (a2[1].createdOn?.getTime() ?? 0));
    return uniqueArticles;
};
const $displayArticles = ref(
    await getDisplayArticles(
        $journal.value,
        $index.value,
        $displayCategories.value.map(([id]) => id),
    ),
);
watch([$journal, $index, $displayCategories], async ([journal, index, displayCategories]) => {
    const categoryIDs = displayCategories.map(([id]) => id);
    $displayArticles.value = await getDisplayArticles(journal, index, categoryIDs);
});

const $pageMeta = computed(() =>
    $categoryID.value === 'all'
        ? {
              title: 'fsufitch@homepage - Journal',
              description: '',
          }
        : {
              title: `fsufitch@homepage - Journal (${$index.value.categories[$categoryID.value].name})`,
              description: '',
          },
);

console.log('display articles', $displayArticles.value);
</script>

<template>
    <PageMetadataInjector :title="$pageMeta.title" :description="$pageMeta.description" page-type="webpage" />
    <VSheet class="mt-6 text-center">
        <h2>
            Journal
            <small v-if="$categoryID !== 'all'" class="text-disabled">
                (Category: {{ $index.categories[$categoryID].name }})
            </small>
        </h2>
    </VSheet>

    <VDivider class="ma-6" />

    <VRow class="align-stretch justify-center">
        <VCol v-for="[id, article] in $displayArticles" :key="id" cols="12" sm="6" lg="4" xl="3">
            <ArticleSummaryCard :journal="$journal" :article="[id, article]" class="fill-height" />
        </VCol>
    </VRow>
</template>
