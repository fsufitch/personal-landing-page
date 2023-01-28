<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDisplay } from 'vuetify/lib/framework.mjs';

import { useJournal } from '@app/journal/journal';
import { JournalCategory, JournalIndex } from '@proto/journal';
import { readArticleAttachmentRaw, ArticleAttachmentRaw } from '@app/components/journal/service';
import MarkdownRenderer from '@app/components/markdown/MarkdownRenderer.vue';
import PageMetadataInjector from '@app/components/page-meta/PageMetadataInjector.vue';

import { ArticleIndex } from '@proto/article';

const route = useRoute();
const articleID = route.params?.articleID?.toString();

const $journal = useJournal();
const $journalIndex = ref<JournalIndex>();
const $article = ref<ArticleIndex | null>();
const $categories = ref<[string, JournalCategory][]>([]);
const $articleData = ref<ArticleAttachmentRaw>();

const $loadState = ref<{ loading?: boolean; ready?: boolean; error?: string }>({ loading: true });

watch(
    [$journal, () => articleID],
    async ([journal, articleID]) => {
        if (!journal) {
            $loadState.value = { error: 'No journal loaded' };
            return;
        }

        if (!articleID) {
            $loadState.value = { error: 'No article ID given' };
            return;
        }

        $journalIndex.value = await journal.index();

        $article.value = await journal.article(articleID);

        $categories.value = Object.entries($journalIndex.value.categories)
            .filter(([, category]) => !category.hidden)
            .filter(([, category]) => category.articles.includes(articleID))
            .sort(([, c1], [, c2]) => (c1.name < c2.name ? -1 : c1.name > c2.name ? 1 : 0));

        $articleData.value = await readArticleAttachmentRaw(journal, articleID, 'body');

        $loadState.value = { ready: true };
    },
    { immediate: true },
);

const $pageMetaProps = computed(() => ({
    title: $article.value?.title ?? '',
    description: $article.value?.blurb ?? '',
    image: $article.value?.bannerImageFilename
        ? $journal.value?.fileURL(articleID, $article.value.bannerImageFilename)
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
                <VCol v-if="$loadState.loading" cols="12" md="auto">
                    <h1>
                        Loading article...
                        <VProgressCircular v-if="$loadState.loading" indeterminate />
                    </h1>
                </VCol>

                <VCol v-if="$loadState.ready" cols="12" md="auto">
                    <h1>{{ $article?.title }}</h1>
                    <p>
                        <RouterLink v-for="[id, category] in $categories" :key="id" :to="`/journal/c/${id}`">
                            <VChip pill rounded size="x-small" class="ma-1 on-surface" link>
                                {{ category.name }}
                            </VChip>
                        </RouterLink>
                    </p>
                </VCol>
                <VCol v-if="$loadState.ready" :class="$display.mdAndUp.value ? 'text-right' : 'text-left'">
                    <span class="text-caption text-disabled ma-1">
                        Posted: {{ $article?.createdOn?.toLocaleDateString() }}
                        {{ $article?.updatedOn ? `(Update: ${$article?.updatedOn.toLocaleString()})` : '' }}
                    </span>
                    <VBtn variant="tonal" icon="mdi-file-code" size="small" :href="$articleData?.url" target="_blank" />
                </VCol>
            </VRow>
            <VDivider class="ma-5" />

            <VCard v-if="$loadState.ready">
                <VCardText v-if="$articleData?.mimeType === 'text/markdown'" class="article-body">
                    <Suspense>
                        <MarkdownRenderer :content="$articleData?.data?.toString() || ''" />
                    </Suspense>
                </VCardText>
                <VCardText v-else>
                    Cannot render content of mimetype
                    <code> {{ $articleData?.mimeType || '[unknown]' }} </code>.
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
