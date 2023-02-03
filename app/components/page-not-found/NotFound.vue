<script setup lang="ts">
import { usePageMetadata } from '@app/page-metadata';
import NotFoundCat from './404-cat.jpg';

const $pageMetadata = usePageMetadata();
$pageMetadata.value = {
    title: 'Page not found - @fsufitch',
    description: '',
};
</script>

<template>
    <VRow justify="center" align-content="center" class="fill-height">
        <VCol cols="12" sm="9" md="6">
            <VCard>
                <v-img :src="NotFoundCat" gradient="12px"></v-img>
                <VCardTitle>Oops! Page not found!</VCardTitle>
                <VCardText>
                    <p>
                        This page does not exist. If this is an error, please tell me! Otherwise, may I suggest
                        <RouterLink to="/">the homepage</RouterLink>?
                    </p>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>
