<script setup lang="ts">
import { useJournal } from '@app/journal/journal';
import { ArticleIndex } from '@proto/article';
import { JournalCategory, JournalIndex } from '@proto/journal';
import PlaceholderBanner from './placeholder-banner.png';

import { defineProps, ref, watch } from 'vue';

const PROPS = defineProps<{ article: string }>();
const articleURL = `/journal/a/${PROPS.article}`;

const $journal = useJournal();
const $journalIndex = ref<JournalIndex>();
const $article = ref<ArticleIndex>();
const $categories = ref<[string, JournalCategory][]>([]);
const $bannerImageSrc = ref<string>('');

watch(
    [$journal, () => PROPS.article],
    async ([journal, articleID]) => {
        if (!journal) {
            console.error('Tried to render article card from null journal');
            return;
        }
        if (!articleID) {
            console.error('Tried to render article card from null articleID');
            return;
        }

        $journalIndex.value = await journal.index();

        $article.value = await journal.article(articleID);

        $categories.value = Object.entries($journalIndex.value.categories)
            .filter(([, category]) => !category.hidden)
            .filter(([, category]) => category.articles.includes(articleID))
            .sort(([, c1], [, c2]) => (c1.name < c2.name ? -1 : c1.name > c2.name ? 1 : 0));

        $bannerImageSrc.value = $article.value.bannerImageFilename
            ? journal.fileURL(articleID, $article.value.bannerImageFilename)
            : PlaceholderBanner;
    },
    { immediate: true },
);
</script>

<template>
    <VCard v-bind="PROPS" class="d-flex flex-column" link>
        <RouterLink :to="articleURL" class="text-decoration-none">
            <VCardTitle class="full-title text-center on-surface" :to="articleURL">
                {{ $article?.title }}
            </VCardTitle>
            <VImg aspect-ratio="3" cover :src="$bannerImageSrc" :lazy-src="PlaceholderBanner" :to="articleURL" />
        </RouterLink>

        <VCardText>
            <p>{{ $article?.blurb }}</p>
        </VCardText>
        <VCardActions>
            <VRow>
                <VCol class="d-flex justify-start align-end flex-wrap">
                    <RouterLink v-for="[id, category] in $categories" :key="id" :to="`/journal/c/${id}`">
                        <VChip pill rounded size="x-small" class="ma-1 on-surface" link>
                            {{ category.name }}
                        </VChip>
                    </RouterLink>

                    <p class="text-caption text-disabled ma-1">
                        Posted: {{ $article?.createdOn?.toLocaleDateString() }}
                    </p>
                </VCol>
                <VCol class="d-flex flex-column justify-end align-end">
                    <VBtn :to="articleURL" variant="outlined" color="primary">Read</VBtn>
                </VCol>
            </VRow>
        </VCardActions>
    </VCard>
</template>

<style lang="scss">
.comma-list:not(:last-child)::after {
    content: ', ';
}

.full-title {
    hyphens: none;
    word-wrap: break-word;
    white-space: break-spaces;
}
</style>
