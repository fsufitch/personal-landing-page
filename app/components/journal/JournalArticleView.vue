<script setup lang="ts">
import { Journal } from '@app/journal/journal';
import { JournalIndex } from '@proto/journal';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getActiveJournalInfo, readArticleAttachmentRaw } from './service';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import MarkdownRenderer from '@app/components/markdown/MarkdownRenderer.vue';
import PageMetadataInjector from '@app/components/page-meta/PageMetadataInjector.vue';
import { propsToAttrMap } from '@vue/shared';

const $journalInfo = computed(() => getActiveJournalInfo());
const $journal = computed(() => $journalInfo.value.journal);
const $journalIndex = ref(await $journal.value.index());
watch($journal, async (journal) => ($journalIndex.value = await journal.index()));

const route = useRoute();
const $articleID = computed(() => route.params?.articleID?.toString() || '');

const getArticle = (journal: Journal, articleID: string) => (articleID ? journal.article(articleID) : null);
const $article = ref(await getArticle($journal.value, $articleID.value));
watch([$journal, $articleID], async ([journal, articleID]) => ($article.value = await getArticle(journal, articleID)));

const computeCategories = (journalIndex: JournalIndex, articleID: string) =>
    Object.entries(journalIndex.categories)
        .filter(([, category]) => !category.hidden)
        .filter(([, category]) => category.articles.includes(articleID))
        .sort(([, c1], [, c2]) => (c1.name < c2.name ? -1 : c1.name > c2.name ? 1 : 0));

const $categories = ref(computeCategories($journalIndex.value, $articleID.value));
watch(
    [$journalIndex, $articleID],
    async ([journalIndex, articleID]) => ($categories.value = computeCategories(journalIndex, articleID)),
);

const $articleData = ref(await readArticleAttachmentRaw($journal.value, $articleID.value, 'body'));

const $pageMetaProps = computed(() => ({
    title: $article.value?.title ?? '',
    description: $article.value?.blurb ?? '',
    image: $article.value?.bannerImageFilename
        ? $journal.value.fileURL($articleID.value, $article.value.bannerImageFilename)
        : undefined,
    pageType: 'article',
}));

const $display = useDisplay();
</script>

<template>
    <PageMetadataInjector v-bind="$pageMetaProps" />
    <VRow class="justify-center">
        <VCol :cols="$display.smAndDown.value ? 12 : $display.md.value ? 10 : $display.lg.value ? 8 : 6">
            <VRow>
                <VCol cols="12" md="auto">
                    <h1>{{ $article?.title }}</h1>
                    <p>
                        <RouterLink v-for="[id, category] in $categories" :key="id" :to="`/journal/c/${id}`">
                            <VChip pill rounded size="x-small" class="ma-1 on-surface" link>
                                {{ category.name }}
                            </VChip>
                        </RouterLink>
                    </p>
                </VCol>
                <VCol :class="$display.mdAndUp.value ? 'text-right' : 'text-left'">
                    <span class="text-caption text-disabled ma-1">
                        Posted: {{ $article?.createdOn?.toLocaleDateString() }}
                        {{ $article?.updatedOn ? `(Update: ${$article?.updatedOn.toLocaleString()})` : '' }}
                    </span>
                    <VBtn variant="tonal" icon="mdi-file-code" size="small" :href="$articleData.url" target="_blank" />
                </VCol>
            </VRow>
            <VDivider class="ma-5" />

            <VCard>
                <VCardText v-if="$articleData.mimeType === 'text/markdown'" class="article-body">
                    <Suspense>
                        <MarkdownRenderer :content="$articleData.data" />
                    </Suspense>
                </VCardText>
                <VCardText v-else>
                    Cannot render content of mimetype
                    <code> {{ $articleData.mimeType }} </code>.
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>

<style>
.not-too-wide {
    max-width: 75%;
}

.article-body {
    line-height: 1.75 !important;
}
</style>
