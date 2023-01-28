<script setup lang="ts">
import { useDisplay, useTheme } from 'vuetify/lib/framework.mjs';
import { ref, computed, Ref } from 'vue';

import { useRoute } from 'vue-router';

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
        text: 'Journal',
        icon: 'mdi-notebook',
        to: '/journal',
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

const route = useRoute();
const $titleRoute = computed(() => {
    return route.name;
});

const $theme = useTheme();
const $themeType = computed(() => ($theme.current.value.dark ? 'dark' : 'light'));
const toggleTheme = () => ($theme.global.name.value = $themeType.value === 'dark' ? 'light' : 'dark');
</script>

<template>
    <VAppBar density="comfortable" color="primary" fixed>
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

    <VNavigationDrawer :model-value="$drawer" temporary @update:model-value="(val) => ($drawer = val)">
        <div class="fill-height d-flex flex-column justify-space-between">
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
                    append-icon="mdi-open-in-new"
                    :title="`v${version}`"
                    :subtitle="commitRef"
                />
            </VList>
            <VList>
                <VListItem @click="toggleTheme">
                    <template #prepend>
                        <VIcon v-if="$themeType === 'dark'" icon="mdi-weather-night" />
                        <VIcon v-else icon="mdi-weather-sunny" />
                    </template>
                    <div class="align-center">Theme</div>
                    <template #append> <VSwitch hide-details :model-value="$themeType === 'light'" /> </template>
                </VListItem>
            </VList>
        </div>
    </VNavigationDrawer>
</template>
