<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useJournal } from '@app/journal/journal';
import { JournalCategory, JournalIndex } from '@proto/journal';
import ArticleSummaryCard from './ArticleSummaryCard.vue';
import { useRoute } from 'vue-router';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { ArticleIndex } from '@proto/article';
import { usePageMetadata } from '@app/page-metadata';

const route = useRoute();
const $categoryID = computed(() => route.params?.categoryID?.toString() || 'all');

const $journal = useJournal();
const $journalIndex = ref<JournalIndex>();
const $category = ref<JournalCategory>();

const $displayCategories = ref<[string, JournalCategory][]>([]);
const $browseCategories = ref<[string, JournalCategory][]>([]);
const $displayArticles = ref<[string, ArticleIndex][]>([]);

const $pageMetadata = usePageMetadata();

watch(
    [$journal, $categoryID],
    async ([journal, categoryID]) => {
        if (!journal) {
            console.error('Tried to render article from null journal');
            return;
        }

        if (!categoryID) {
            console.error('Tried to render empty article ID');
            return;
        }

        $journalIndex.value = await journal.index();

        $category.value = $journalIndex.value.categories[categoryID];

        $displayCategories.value = Object.entries($journalIndex.value.categories).filter(
            ([id]) => categoryID === 'all' || categoryID === id,
        );

        $browseCategories.value = Object.entries($journalIndex.value.categories).filter(
            ([, category]) => !category.hidden,
        );

        const articleIDs: string[] = $displayCategories.value.flatMap(
            ([id]) => $journalIndex.value?.categories[id].articles ?? [],
        );
        const articlesPromises = articleIDs.map((id) => journal.article(id).then((article) => ({ id, article })));
        const articles = await Promise.all(articlesPromises);
        const uniqueArticles = Object.entries(Object.fromEntries(articles.map((obj) => [obj.id, obj.article])))
            .filter(([id]) => !!id)
            .sort((a1, a2) => (a2[1].createdOn?.getTime() ?? 0) - (a1[1].createdOn?.getTime() ?? 0));
        $displayArticles.value = uniqueArticles;

        $pageMetadata.value = {
            title: categoryID === 'all' ? 'Journal - @fsufitch' : `Journal (${$category.value.name}) - @fsufitch`,
            description: '',
        };
    },
    { immediate: true },
);

const $display = useDisplay();
</script>

<template>
    <VRow class="mt-6 justify-center">
        <VCol
            cols="12"
            md="auto"
            :class="`d-flex flex-column  ${$display.mdAndUp.value ? 'align-start' : 'align-center'}`"
        >
            <h2>
                Journal
                <small v-if="$category" class="text-disabled"> (Category: {{ $category?.name }}) </small>
            </h2>
            <p>... blog, mission log, or timestamped long-form essay collection</p>
        </VCol>
        <VCol cols="auto" :class="`d-flex align-end ${$display.mdAndUp.value ? 'justify-end' : 'justify-center'}`">
            <VBtn id="categoryMenu" color="secondary">
                Browsing: {{ $category ? $category.name : '(all)' }}
                <VMenu activator="#categoryMenu">
                    <VList>
                        <VListItem to="/journal">
                            <VRadio
                                density="compact"
                                :model-value="$categoryID === 'all'"
                                label="All Categories"
                                hide-details
                            />
                        </VListItem>
                        <VListItem v-for="[id, category] in $browseCategories" :key="id" :to="`/journal/c/${id}`">
                            <VRadio
                                density="compact"
                                :model-value="$categoryID === id"
                                :label="category.name"
                                hide-details
                            />
                        </VListItem>
                    </VList>
                </VMenu>
            </VBtn>
        </VCol>
    </VRow>

    <VDivider class="ma-6" />

    <VRow class="align-stretch justify-center">
        <VCol v-for="[id] in $displayArticles" :key="id" cols="12" sm="6" lg="4" xl="3">
            <ArticleSummaryCard v-if="$journal" :journal="$journal" :article="id" class="fill-height" />
        </VCol>
    </VRow>
</template>
