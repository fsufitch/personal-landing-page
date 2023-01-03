<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { ref, computed, Ref } from 'vue';

import { useRouter } from 'vue-router';

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

// ========== GENERAL NAV STATE ===========

const $vuetifyDisplay = useDisplay();
const $navMode = computed(() => ($vuetifyDisplay.mdAndUp.value ? 'desktop' : 'mobile'));

const $drawer: Ref<boolean> = ref(false);

const router = useRouter();
const $titleRoute = computed(() => {
    const matchedRoutes = router.currentRoute.value.matched;
    if (!matchedRoutes.length) {
        return '404';
    }
    const route = matchedRoutes[0];
    return route.name;
});
</script>

<template>
    <VAppBar density="comfortable" color="primary">
        <VAppBarNavIcon @click="$drawer = !$drawer" />
        <VAppBarTitle>
            <h4>
                <code>~/{{ $titleRoute }}</code>
            </h4>
        </VAppBarTitle>
        <template #append>
            <VBtn
                variant="outlined"
                color="info"
                :href="`https://github.com/fsufitch/personal-landing-page/tree/${commitRef}`"
                target="_blank"
                prepend-icon="mdi-git"
                append-icon="mdi-open-in-new"
                >{{ version }} ({{ commitRef }})
            </VBtn>
        </template>
    </VAppBar>

    <VNavigationDrawer :model-value="$drawer">
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

            <VListItem
                v-if="$navMode === 'desktop'"
                :href="`https://github.com/fsufitch/personal-landing-page/tree/${commitRef}`"
                target="_blank"
                prepend-icon="mdi-git"
                append-icon="mdi-open-in-new"
                :title="`v${version}`"
                :subtitle="commitRef"
            />
        </VList>
    </VNavigationDrawer>
</template>

<style>
#nav-toggle {
    position: fixed;
    top: 0px;
    left: 0px;
}
</style>
