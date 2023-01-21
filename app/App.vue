<script setup lang="ts">
import AppNavigation from '@app/components/AppNavigation.vue';
</script>

<template>
    <VApp>
        <VLayout>
            <AppNavigation />
            <VMain>
                <VContainer class="fill-height">
                    <Suspense>
                        <RouterView></RouterView>
                    </Suspense>
                </VContainer>
            </VMain>
        </VLayout>
    </VApp>
</template>

<style lang="scss">
@import 'highlight.js/scss/xt256.scss';

body {
    font-family: 'Libre Baskerville', serif;
}
</style>
