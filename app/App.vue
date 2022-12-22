<script setup lang="ts">
import TopNavigation from '@app/components/AppNavigation.vue';
</script>

<template>
    <VApp>
        <VLayout>
            <TopNavigation />
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
</style>
