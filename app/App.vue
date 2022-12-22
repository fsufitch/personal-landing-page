<script setup lang="ts">
import AppBar from '@app/components/AppBar.vue';
import { ref } from 'vue';
const count = ref(0);
</script>

<template>
    <VApp>
        <VAppBar>
            <AppBar />
            <VBtn color="primary" @click="count++">You clicked me {{ count }} times.</VBtn>
        </VAppBar>
        <VMain>
            <VContainer>
                <RouterView></RouterView>
            </VContainer>
        </VMain>
    </VApp>
</template>

<style>
body {
    font-family: 'Libre Baskerville', serif;
}
</style>
