<script setup lang="ts">
const props = defineProps<{ image?: string; href?: string }>();
</script>

<template>
    <VCard color="surface-variant">
        <VCardItem>
            <VCardTitle> <slot name="title" /> </VCardTitle>
            <VCardSubtitle> <slot name="subtitle" /> </VCardSubtitle>
            <template #append>
                <VAvatar tile size="5em"><VImg :src="props.image" /></VAvatar>
            </template>
        </VCardItem>
        <VCardText :class="$style['card-text']">
            <slot name="body" />
        </VCardText>
        <VCardActions v-if="props.href">
            <VSpacer />
            <VBtn size="small" variant="outlined" color="primary" :href="props.href" target="_blank">
                <VIcon icon="mdi-open-in-new" /> Check it out!
            </VBtn>
        </VCardActions>
    </VCard>
</template>

<style lang="scss" module>
.card-text {
    & p {
        margin-bottom: 0.75em;
    }
}
</style>
