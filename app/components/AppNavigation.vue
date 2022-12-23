<script setup lang="ts">
const NAVIGATION = [
    {
        text: 'About Me',
        icon: 'mdi-account-circle',
        to: '/',
    },
    {
        text: 'Projects',
        icon: 'mdi-archive',
        to: '/projects',
    },
    {
        text: 'Medium Blog',
        icon: 'mdi-notebook-edit',
        href: 'https://medium.com/@fsufitch',
    },
    {
        text: 'Résumé',
        icon: 'mdi-trophy',
        href: 'https://docs.google.com/document/d/16zpkvHbJF9cVp5u56MnsDBIVBk-Fuk6riZLXBhrElnc',
    },
];

// eslint-disable-next-line no-undef
const commitRef = __GITREF__;
// eslint-disable-next-line no-undef
const version = __VERSION__;
</script>

<template>
    <VNavigationDrawer permanent rail expand-on-hover width="30em">
        <VList>
            <VListItem
                v-for="(value, idx) in NAVIGATION"
                :key="idx"
                :to="value.to"
                :href="value.href"
                :prepend-icon="value.icon"
                :title="value.text"
                :target="value.href ? '_blank' : ''"
                color="primary"
            >
                <template #append> <VIcon v-if="value.href" icon="mdi-open-in-new" /> </template>
            </VListItem>
        </VList>

        <template #append>
            <VList>
                <VListItem
                    :href="`https://github.com/fsufitch/personal-landing-page/tree/${commitRef}`"
                    target="_blank"
                    prepend-icon="mdi-git"
                    append-icon="mdi-open-in-new"
                    :title="`v${version}`"
                    :subtitle="commitRef"
                />
            </VList>
        </template>
    </VNavigationDrawer>
</template>

<style></style>
