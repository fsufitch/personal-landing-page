<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { ref, computed, Ref } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import { useAppTheme, useVuetifyTheme } from '@app/theming';
import { getSystemPreferredThemeKey, AppTheme, VuetifyThemeKey } from '@app/styles/themes';

const $route = useRoute();
const $router = useRouter();

$router.getRoutes();

const breadcrumbFunExtensions = [
    'html',
    'htm',
    'php',
    'java',
    'kt',
    'c',
    'cpp',
    'h',
    'py',
    'go',
    'rb',
    'md',
    'rst',
    'js',
    'ts',
    'css',
    'scss',
    'vue',
    'sql',
    'json',
    'yaml',
    'yml',
];

const routeBreadcrumbElements: Record<string, string> = {
    'about-me': 'about-me',
    projects: 'projects',
    'journal-redirect': 'redirecting-to-journal',
    journal: 'journal',
    'journal/article': 'journal',
    'page-not-found': '404',
};

interface Breadcrumb {
    title: string;
    to?: string;
    disabled?: boolean;
}

const $breadcrumbsBase = computed<Breadcrumb[]>(() => {
    const crumbs = [
        { title: '~', to: '/' },
        { title: 'fsufitch', to: '/' },
    ];
    const baseTitle = routeBreadcrumbElements[$route.name?.toString() || ''] || '';
    if (baseTitle && $route.path) {
        crumbs.push({
            title: routeBreadcrumbElements[$route.name?.toString() || ''] || '',
            to: $route.path,
        });
    }
    return crumbs;
});

const $breadcrumbsJournalCategory = computed<Breadcrumb[]>(() =>
    $route.name !== 'journal'
        ? []
        : [
              { title: 'category', disabled: true },
              {
                  title: `${$route?.params?.categoryID}`,
                  to: `/journal/c/${$route?.params?.categoryID}`,
              },
          ],
);

const $breadcrumbsJournalArticle = computed<Breadcrumb[]>(() =>
    $route.name !== 'journal/article'
        ? []
        : [
              { title: 'article', disabled: true },
              {
                  title: `${$route?.params?.articleID}`,
                  to: `/journal/a/${$route?.params?.articleID}`,
              },
          ],
);

const $breadcrumbs = computed<Breadcrumb[]>(() => {
    const crumbs = [
        ...$breadcrumbsBase.value,
        ...$breadcrumbsJournalCategory.value,
        ...$breadcrumbsJournalArticle.value,
    ];
    const ext = breadcrumbFunExtensions[Math.floor(Math.random() * breadcrumbFunExtensions.length)];
    Object.assign(crumbs[crumbs.length - 1], {
        title: crumbs[crumbs.length - 1].title + '.' + ext,
        disabled: false,
    });
    return crumbs;
});

const NAVIGATION = [
    {
        routeName: 'about-me',
        text: 'About Me',
        breadcrumb: 'about-me.html',
        icon: 'mdi-account-circle',
        to: '/',
    },
    {
        text: 'Projects',
        breadcrumb: 'projects.py',
        icon: 'mdi-archive',
        to: '/projects',
    },
    {
        text: 'Journal',
        breadcrumb: 'journal',
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
const $showDrawer: Ref<boolean> = ref(false);

const $appTheme = useAppTheme();
const $vuetifyTheme = useVuetifyTheme();
const toggleTheme = () =>
    ($appTheme.value = {
        [VuetifyThemeKey.dark]: AppTheme.light,
        [VuetifyThemeKey.light]: AppTheme.dark,
    }[$vuetifyTheme.value ?? getSystemPreferredThemeKey()]);
</script>

<template>
    <VAppBar density="comfortable" color="primary">
        <VAppBarNavIcon @click="$showDrawer = !$showDrawer" />
        <VAppBarTitle>
            <VBreadcrumbs :items="$breadcrumbs" density="compact" style="overflow-x: auto" />
        </VAppBarTitle>
        <template #append>
            <VBtn
                v-if="$navMode === 'desktop'"
                variant="outlined"
                :href="`https://github.com/fsufitch/personal-landing-page/tree/${commitRef}`"
                target="_blank"
                prepend-icon="mdi-git"
                append-icon="mdi-open-in-new"
                >{{ version }} ({{ commitRef }})
            </VBtn>
        </template>
    </VAppBar>

    <VNavigationDrawer :model-value="$showDrawer" temporary @update:model-value="(val) => ($showDrawer = val)">
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
            </VList>
            <VList>
                <VListItem @click="toggleTheme">
                    <template #prepend>
                        <VIcon v-if="$vuetifyTheme === 'dark'" icon="mdi-weather-night" />
                        <VIcon v-else icon="mdi-weather-sunny" />
                    </template>
                    <div class="align-center">Theme</div>
                    <template #append> <VSwitch hide-details :model-value="$vuetifyTheme === 'light'" /> </template>
                </VListItem>
                <VListItem
                    v-if="$navMode === 'mobile'"
                    :href="`https://github.com/fsufitch/personal-landing-page/tree/${commitRef}`"
                    target="_blank"
                    append-icon="mdi-open-in-new"
                    prepend-icon="mdi-github"
                    :title="`v${version}`"
                    :subtitle="commitRef"
                />
            </VList>
        </div>
    </VNavigationDrawer>
</template>
