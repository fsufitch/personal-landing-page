<script setup lang="ts">
const contactInfoEncoded = await import('./contact.json?raw')
    .then((module) => module.default)
    .then((rawJSON) => JSON.parse(rawJSON));

const location = atob(contactInfoEncoded?.location ?? btoa('UNKNOWN'));
const emails = atob(contactInfoEncoded?.emails ?? btoa('UNKNOWN'))
    .split(',')
    .map((x) => x.trim())
    .filter((x) => !!x);
const phones = atob(contactInfoEncoded?.phones ?? btoa('UNKNOWN'))
    .split(',')
    .map((x) => x.trim())
    .filter((x) => !!x);
</script>

<template>
    <VSheet>
        <VList density="compact">
            <!-- emails -->

            <VListItem
                v-for="(email, idx) in emails"
                :key="idx"
                :prepend-icon="idx ? 'null' : 'mdi-email'"
                :href="`mailto:${email}`"
            >
                {{ email }}
            </VListItem>
            <VListItem prepend-icon="null">
                <p class="text-disabled">(pick whichever, they go to the same place)</p>
            </VListItem>

            <VDivider />

            <!-- phones -->
            <VListItem
                v-for="(phone, idx) in phones"
                :key="idx"
                :prepend-icon="idx ? 'null' : 'mdi-phone'"
                :href="`tel:${phone}`"
            >
                {{ phone }}
            </VListItem>

            <VDivider />

            <!-- home address -->
            <VListItem prepend-icon="mdi-map-marker">
                <span class="text-blur">1234 Available On Request Blvd</span>
            </VListItem>
            <VListItem prepend-icon="null"> {{ location }} </VListItem>
        </VList>
    </VSheet>
</template>

<style lang="scss">
.text-blur {
    filter: blur(0.25em);
}
</style>
