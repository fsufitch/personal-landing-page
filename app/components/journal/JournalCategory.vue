<script setup lang="ts">
import { getJournal, getDefaultJournalURL } from './service';
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Journal } from '@app/journal/journal';
import { JournalIndex } from '@proto/journal';
import PageMetadataInjector from '@app/components/page-meta/PageMetadataInjector.vue';

const route = useRoute();

const $journalURL = computed(() => route.params['j']?.toString() ?? getDefaultJournalURL());
const $journal = computed(() => getJournal($journalURL.value));

const $categoryID = computed(() => route.params?.categoryID?.toString() || 'all');

const $index = ref(await $journal.value.index());
watch($journal, async (journal) => ($index.value = await journal.index()));

const $displayCategories = computed(() =>
    Object.entries($index.value.categories).filter(([id]) => $categoryID.value === 'all' || $categoryID.value === id),
);

const $browseCategories = computed(() =>
    Object.entries($index.value.categories).filter(([, category]) => !category.hidden),
);

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

const $articleCategories = computed(() => {
    const articleCategories: { [articleID: string]: string[] } = {};
    for (const categoryID in $index.value.categories) {
        for (const articleID of $index.value.categories[categoryID].articles) {
            articleCategories[articleID] = articleCategories[articleID] ?? [];
            if (!articleCategories[articleID].includes(categoryID)) {
                articleCategories[articleID].push(categoryID);
            }
        }
    }
    return articleCategories;
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

console.log($displayArticles.value);
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

    <VRow align-content="space-between">
        <VSpacer />

        <VCol v-for="[id, article] in $displayArticles" :key="id" cols="4">
            <VCard>
                <VCardTitle>{{ article.title }}</VCardTitle>
                <VCardText>
                    <p>{{ article.blurb }}</p>
                    <p>
                        <small class="text-disabled">
                            Published: {{ article.createdOn?.toLocaleString() }} in
                            <span
                                v-for="categoryID in $articleCategories[id]?.filter(
                                    (cid) => !$index.categories[cid].hidden,
                                ) ?? []"
                                :key="categoryID"
                                class="comma-list"
                            >
                                <RouterLink :to="`/journal/c/${categoryID}`">
                                    {{ $index.categories[categoryID].name }}
                                </RouterLink>
                            </span>
                        </small>
                    </p>
                </VCardText>
                <VCardActions class="float-right">
                    <VBtn :to="`/journal/a/${id}`" variant="elevated" color="primary">Read</VBtn>
                </VCardActions>
            </VCard>
        </VCol>
        <VSpacer />
    </VRow>
</template>

<style lang="scss">
.comma-list:not(:last-child)::after {
    content: ', ';
}
</style>
