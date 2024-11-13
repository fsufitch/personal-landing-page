<script setup lang="ts">
import AppNavigation from '@app/components/AppNavigation.vue';

const appReady = () => {
    // When the Vue app is ready, remove the pre-vue stuff from the DOM so it does not interfere
    document.querySelector('#pre-vue')?.remove();
    console.info('Vue ready');
};
</script>

<template>
    <VApp @vue:mounted="appReady">
        <VLayout>
            <AppNavigation />
            <VMain scrollable>
                <VContainer>
                    <RouterView></RouterView>
                </VContainer>
            </VMain>
        </VLayout>
    </VApp>
</template>

<style lang="scss">
body {
    font-family: 'Libre Baskerville', serif;
}
</style>
