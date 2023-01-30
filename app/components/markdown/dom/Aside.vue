<script lang="ts">
import MarkdownIt from 'markdown-it';
import MarkdownItContainer from 'markdown-it-container';
import Token from 'markdown-it/lib/token';

export const useAside = (md: MarkdownIt) =>
    md.use(MarkdownItContainer, 'aside', {
        validate: (params: string) => {
            const matches = params.trim().match(/^aside\s+(left|center|right)/);
            return !!matches;
        },
        render: (tokens: Token[], idx: number) => {
            if (tokens[idx].nesting === -1) {
                // Tag is closing
                return `</aside>\n`;
            }

            const matchedTokens = tokens[idx].info.trim().match(/^^aside\s+(left|center|right)/);
            if (matchedTokens?.length !== 2 || !matchedTokens[1]) {
                console.error('Illegal aside, ignoring; info: ', tokens[idx].info);
                return '';
            }
            let position = encodeURIComponent(matchedTokens[1]);

            if (tokens[idx].nesting === 1) {
                // Tag is opening
                return `<aside position="${position}">\n`;
            }

            console.warn('Body-less aside omitted');
            return '<!-- body-less aside omitted -->';
        },
    });
</script>

<script setup lang="ts">
import ImageCard from './ImageCard.vue';
const props = defineProps<{ node: Element }>();
const imageNode = document.createElement('img');
imageNode.setAttribute('position', props.node.getAttribute('position') || '');
</script>

<template>
    <ImageCard :node="imageNode">
        <slot />
    </ImageCard>
</template>
