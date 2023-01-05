<script setup lang="ts">
import { getJournal, getDefaultJournalURL } from './service';
import { ref, computed, watch } from 'vue';
import { ArticleIndex } from '@proto/article';
import { useRoute } from 'vue-router';
import { Journal } from '@app/journal/journal';
import { JournalIndex } from '@proto/journal';

const route = useRoute();

const $journalURL = computed(() => route.params['j']?.toString() ?? getDefaultJournalURL());
const $journal = computed(() => getJournal($journalURL.value));

const $categoryID = computed(() => route.params.categoryID.toString() || 'all');

const $index = ref(await $journal.value.index());
watch($journal, async (journal) => ($index.value = await journal.index()));

const $displayCategories = computed(() =>
    Object.entries($index.value.categories).filter(([id]) => $categoryID.value === 'all' || $categoryID.value === id),
);

const getDisplayArticles = async (journal: Journal, index: JournalIndex, displayCategoryIDs: string[]) => {
    const articleIDs = displayCategoryIDs.flatMap((id) => index.categories[id].articles);
    const articlesPromises = articleIDs.map((id) => journal.article(id).then((article) => ({ id, article })));
    const articles = await Promise.all(articlesPromises);
    articles.sort((a1, a2) => (a1.article.createdOn?.getTime() ?? 0) - (a2.article?.createdOn?.getTime() ?? 0));
    const articleTuples: [string, ArticleIndex][] = articles.map((a) => [a.id, a.article]);
    return articleTuples;
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

const $articlesMap = computed(() => Object.fromEntries($displayArticles.value));
</script>

<template>
    <p style="margin-top: 50%">hello</p>
    <div v-for="[cID, category] in $displayCategories" :key="cID">
        <VDivider />
        <h3>
            {{ category.name }} (<code>{{ cID }}</code
            >)
        </h3>
        <ul>
            <li v-for="aID in category.articles" :key="aID">
                Article: <code>{{ aID }}</code> <br />
                Title: {{ $articlesMap[aID]?.title }} <br />
                Created On: {{ $articlesMap[aID]?.createdOn }}
            </li>
        </ul>
    </div>
</template>
