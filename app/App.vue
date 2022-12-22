<script setup lang="ts">
import TopNavigation from '@app/components/TopNavigation.vue';
</script>

<template>
    <VApp>
        <VLayout>
            <TopNavigation />
            <VMain>
                <VContainer>
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
</style>
