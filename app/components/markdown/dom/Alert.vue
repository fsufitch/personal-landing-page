<script lang="ts">
import MarkdownIt from 'markdown-it';
import MarkdownItContainer from 'markdown-it-container';
import Token from 'markdown-it/lib/token';

export const useMDAlert = (md: MarkdownIt) =>
    md.use(MarkdownItContainer, 'alert', {
        validate: (params: string) => {
            const matches = params.trim().match(/^alert(?:\s(success|info|warning|error))?/);
            return !!matches;
        },
        render: (tokens: Token[], idx: number) => {
            const matchedTokens = tokens[idx].info.trim().match(/^alert(?:\s(success|info|warning|error))?/);
            let alertArg = '';
            if (matchedTokens?.length == 2 && matchedTokens[1]) {
                alertArg = ` type="${encodeURIComponent(matchedTokens[1])}"`;
            }

            if (tokens[idx].nesting === 1) {
                // Tag is opening
                return `<alert${alertArg}>\n`;
            }
            if (tokens[idx].nesting === -1) {
                // Tag is closing
                return `</alert>\n`;
            }

            console.warn('Body-less alert omitted');
            return '<!-- body-less alert omitted -->';
        },
    });
</script>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{ node: Element }>();

const $alertType = computed(() => {
    const value = props.node.getAttribute('type');
    return value === 'success' || value === 'info' || value === 'warning' || value === 'error' ? value : undefined;
});

// const $anchor = computed(() => anchor(`${props.node.nodeName}-${props.node.textContent}`));
</script>

<template>
    <VAlert border="start" variant="outlined" :type="$alertType" class="ma-3">
        <slot />
    </VAlert>
</template>
