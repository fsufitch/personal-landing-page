<script setup lang="ts">
import { ref } from 'vue';

import { Buffer } from 'buffer';

const $contactInfo = ref({
    location: 'UNKNOWN',
    emails: <string[]>[],
    phones: <string[]>[],
});

import('./contact.json?raw')
    .then((module) => module.default)
    .then((rawJSON) => JSON.parse(rawJSON))
    .then((contactInfo) => {
        const UNKNOWN = Buffer.from('UNKNOWN').toString('base64');
        const location = Buffer.from(contactInfo?.location ?? UNKNOWN, 'base64').toString();
        const emails = Buffer.from(contactInfo?.emails ?? UNKNOWN, 'base64')
            .toString()
            .split(',')
            .map((x) => x.trim())
            .filter((x) => !!x);
        const phones = Buffer.from(contactInfo?.phones ?? UNKNOWN, 'base64')
            .toString()
            .split(',')
            .map((x) => x.trim())
            .filter((x) => !!x);

        $contactInfo.value = { location, emails, phones };
    });
</script>

<template>
    <VSheet>
        <VList density="compact">
            <!-- emails -->

            <VListItem
                v-for="(email, idx) in $contactInfo.emails"
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
                v-for="(phone, idx) in $contactInfo.phones"
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
            <VListItem prepend-icon="null"> {{ $contactInfo.location }} </VListItem>
        </VList>
    </VSheet>
</template>

<style lang="scss">
.text-blur {
    filter: blur(0.25em);
}
</style>
