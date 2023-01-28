<script setup lang="ts">
import AppNavigation from '@app/components/AppNavigation.vue';
</script>

<template>
    <VApp>
        <VLayout>
            <AppNavigation />
            <VMain scrollable>
                <VContainer>
                    <Suspense>
                        <RouterView></RouterView>
                    </Suspense>
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
