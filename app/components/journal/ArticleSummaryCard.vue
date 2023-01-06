<script setup lang="ts">
import { Journal } from '@app/journal/journal';
import { ArticleIndex } from '@proto/article';
import { JournalIndex } from '@proto/journal';
import PlaceholderBanner from './placeholder-banner.png';

import { defineProps, computed, ref, watch } from 'vue';
import { useTheme } from 'vuetify/lib/framework.mjs';

const PROPS = defineProps<{ journal: Journal; article: [string, ArticleIndex] }>();

const $articleID = computed(() => PROPS.article[0]);
const $article = computed(() => PROPS.article[1]);

const $journalIndex = ref(await PROPS.journal.index());
watch(PROPS, async () => ($journalIndex.value = await PROPS.journal.index()));

const computeCategories = (journalIndex: JournalIndex, articleID: string) =>
    Object.entries(journalIndex.categories)
        .filter(([, category]) => !category.hidden)
        .filter(([, category]) => category.articles.includes(articleID))
        .sort(([, c1], [, c2]) => (c1.name < c2.name ? -1 : c1.name > c2.name ? 1 : 0));

const $categories = ref(computeCategories($journalIndex.value, $articleID.value));
watch(
    [$journalIndex, $articleID],
    async ([journalIndex, articleID]) => ($categories.value = await computeCategories(journalIndex, articleID)),
);

const bannerImageSrc = computed(() =>
    $article.value.bannerImageFilename
        ? PROPS.journal.fileURL($articleID.value, $article.value.bannerImageFilename)
        : PlaceholderBanner,
);

const $articleURL = computed(() => `/journal/a/${$articleID.value}`);
</script>

<template>
    <VCard v-bind="PROPS" class="d-flex flex-column" link>
        <RouterLink :to="$articleURL" class="text-decoration-none">
            <VCardTitle class="full-title text-center on-surface" :to="$articleURL">
                {{ $article.title }}
            </VCardTitle>
            <VImg aspect-ratio="3" cover :src="bannerImageSrc" :lazy-src="PlaceholderBanner" :to="$articleURL" />
        </RouterLink>

        <VCardText>
            <p>{{ $article.blurb }}</p>
        </VCardText>
        <VCardActions>
            <VRow>
                <VCol class="d-flex justify-start align-end flex-wrap">
                    <VChip
                        v-for="[id, category] in $categories"
                        :key="id"
                        :to="`/journal/c/${id}`"
                        pill
                        rounded
                        size="x-small"
                        class="ma-1"
                    >
                        {{ category.name }}
                    </VChip>
                    <div class="text-caption text-disabled ma-1">
                        {{ $article.createdOn?.toLocaleString() }}
                    </div>
                </VCol>
                <VCol class="d-flex flex-column justify-end align-end">
                    <VBtn :to="$articleURL" variant="outlined" color="primary">Read</VBtn>
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
