<script lang="ts">
import MarkdownIt from 'markdown-it';
import MarkdownItContainer from 'markdown-it-container';
import Token from 'markdown-it/lib/token';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { useJournal } from '@app/journal/journal';

export const useMDImageCard = (md: MarkdownIt) =>
    md.use(MarkdownItContainer, 'imagecard', {
        validate: (params: string) => {
            const matches = params.trim().match(/^imagecard\s(left|right|center)\s(.+)$/);
            return !!matches;
        },
        render: (tokens: Token[], idx: number) => {
            if (tokens[idx].nesting === -1) {
                return `</imagecard>`;
            }

            const matchedTokens = tokens[idx].info.trim().match(/^imagecard\s(left|right|center)\s(.+)$/);
            if (!matchedTokens || matchedTokens.length !== 3) {
                const x = tokens[idx];
                console.error('Bad imagecard token', x.info);
                return '';
            }
            const container = document.createElement('container');

            const imageCard = document.createElement('imagecard');
            imageCard.setAttribute('position', matchedTokens[1]);
            imageCard.setAttribute('src', matchedTokens[2]);
            container.appendChild(imageCard);

            if (tokens[idx].nesting === 1) {
                // Tag is opening
                return container.innerHTML.replace('</imagecard>', '');
            }
            return container.innerHTML;
        },
    });
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{ node: Element }>();
const $display = useDisplay();

const route = useRoute();
const articleID =
    typeof route.params['articleID'] === 'object' ? route.params['articleID'][0] : route.params['articleID'];

const $journal = useJournal();

const $src = computed(() => {
    let src = props.node.getAttribute('src') || '';
    console.log('src', src);
    if (!src.match('^[a-z0-9]+://') && !src.startsWith('/') && articleID) {
        // Relative URL, render relative to article ID if possible
        src = $journal.value?.fileURL(articleID, src) || src;
    }
    return src;
});
const $position = computed(() => props.node.getAttribute('position') || '');
const $floated = computed(() => $display.mdAndUp.value && ['right', 'left'].includes($position.value));
</script>

<template>
    <div v-if="!$floated" class="clear">{{ ' ' }}</div>
    <VRow v-if="!$floated">
        <VSpacer />
        <VCol cols="12" sm="10" md="8" lg="6">
            <VCard width="100%" class="ma-5">
                <VImg cover :src="$src" />
                <VCardText class="imagecard-caption">
                    <slot />
                </VCardText>
            </VCard>
        </VCol>
        <VSpacer />
    </VRow>
    <VCard v-else :class="`float-${$position} clearfix ma-5`" style="max-width: 50%; min-width: 33%">
        <VImg cover :src="$src" />
        <VCardText class="imagecard-caption">
            <slot />
        </VCardText>
    </VCard>
</template>

<style lang="scss">
.clear {
    clear: both;
}
.clearfix::after {
    content: '';
    clear: both;
    display: table;
}

.imagecard-caption {
    &:empty {
        display: none;
    }
}
</style>
