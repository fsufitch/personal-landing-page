<script setup lang="ts">
import AppNavigation from '@app/components/AppNavigation.vue';
</script>

<template>
    <VApp>
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

#pre-vue {
    // This is the "loading" content before the app actually loads, which should be hidden now
    display: none;
}
</style>
