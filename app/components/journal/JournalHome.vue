<script setup lang="ts">
import { getDefaultJournal } from './service';
import { ref, computed, watch, Ref } from 'vue';
import { ArticleIndex } from '@proto/article';
import { Journal } from '@app/journal/journal';

const $journal = ref<Journal | undefined>();
getDefaultJournal().then(({ journal }) => ($journal.value = journal));
const $index = computed(() => $journal.value?.index().value);

const $articles: { [id: string]: Ref<ArticleIndex | undefined> } = {};
watch([$journal, $index], ([journal, index]) => {
    if (!journal || !index) return;
    for (const key in index.categories) {
        index.categories[key].articles.forEach((articleID) => ($articles[articleID] = journal.article(articleID)));
    }
});
</script>

<template>
    <p style="margin-top: 50%">hello</p>
    <ul v-if="$index">
        <li v-for="(category, cKey) in $index.categories" :key="cKey">
            <p>category: {{ category.name }}</p>
            <ul>
                <li v-for="aKey in category.articles" :key="aKey">
                    Article: <code>{{ aKey }}</code> <br />
                    Title: {{ $articles[aKey].value?.title }} <br />
                    Created On: {{ $articles[aKey].value?.createdOn }}
                </li>
            </ul>
        </li>
    </ul>
</template>
