<script setup lang="ts">
import AppNavigation from '@app/components/AppNavigation.vue';
</script>

<template>
    <VApp>
        <AppNavigation />
        <VLayout>
            <VMain>
                <VContainer class="fill-height">
                    <RouterView></RouterView>
                </VContainer>
            </VMain>
        </VLayout>
    </VApp>
</template>

<style>
body {
    font-family: 'Libre Baskerville', serif;
}
p:not(:last-of-type) {
    padding-bottom: 1em;
}
</style>
