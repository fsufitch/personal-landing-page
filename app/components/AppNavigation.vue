<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { ref, computed, watch } from 'vue';

import { GestureState, useDrag, useWheel } from '@vueuse/gesture';

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
const $navVisible = ref($navMode.value === 'desktop'); // Default: show on desktop, hide on mobile
const $navExpanded = ref(false); // Default: collapsed

// ========== DESKTOP BEHAVIOR ==========

// Show and collapse when switching to desktop mode
watch(
    () => $navMode.value,
    (navMode) => {
        if (navMode === 'desktop') {
            $navVisible.value = true;
            $navExpanded.value = false;
        }
    },
);

useDrag(
    (state: GestureState<'drag'>) => {
        if ($navMode.value !== 'desktop') {
            return;
        }

        if (!state._dragPointerId) {
            // This is 0 if it's a mouse pointer; don't handle the pointer drag in desktop mode
            return;
        }

        switch (true) {
            // Drag right = expand
            case state.swipe[0] > 0:
                $navExpanded.value = true;
                break;

            // Drag left = collapse
            case state.swipe[0] < 0:
                $navExpanded.value = false;
                break;
        }
    },
    { domTarget: window, delay: true },
);

// ========== MOBILE BEHAVIOR ==========

// Hide when switching to mobile mode
watch(
    () => $navMode.value,
    (navMode) => {
        if (navMode === 'mobile') {
            $navVisible.value = true;
        }
    },
);

useWheel(
    (state: GestureState<'wheel'>) => {
        if ($navMode.value !== 'mobile') {
            return;
        }
        const directionY = state.direction[1];
        switch (true) {
            // Mouse wheel down, not expanded = hide
            case directionY > 0 && !$navExpanded.value:
                $navVisible.value = false;
                break;

            // Mouse wheel up = show
            case directionY < 0:
                $navVisible.value = true;
                break;
        }
    },
    { domTarget: window, delay: true },
);

useDrag(
    (state: GestureState<'drag'>) => {
        if ($navMode.value !== 'mobile') {
            return;
        }
        const directionY = state.swipe[1];
        console.log(directionY, $navVisible.value, $navExpanded.value);
        switch (true) {
            // Swipe up, hidden = show + collapse
            case directionY < 0 && !$navVisible.value:
                $navVisible.value = true;
                $navExpanded.value = false;
                console.log('asdfjkhasd');
                break;

            // Swipe up, shown, not expanded = expand
            case directionY < 0 && $navVisible.value:
                $navExpanded.value = true;
                console.log('wtf');
                break;

            // Swipe down, shown, not expanded = hide
            case directionY > 0 && $navVisible.value && !$navExpanded.value:
                $navVisible.value = false;
                break;

            // Swipe down, shown, expanded = collapse
            case directionY > 0 && $navVisible.value && $navExpanded.value:
                $navExpanded.value = false;
                break;
        }
    },
    { domTarget: window, delay: true },
);
</script>

<template>
    <VNavigationDrawer
        permanent
        :model-value="$navVisible"
        :location="$navMode === 'mobile' ? 'bottom' : 'left'"
        :rail="!$navExpanded"
        width="30em"
        @mouseenter="$navExpanded = true"
        @mouseleave="$navExpanded = false"
    >
        <VList>
            <!-- Collapsed header for desktop-->
            <VListItem
                v-if="$navMode === 'desktop' && !$navExpanded"
                prepend-icon="mdi-menu"
                title="Site Navigation"
                @click="$navExpanded = true"
            />
            <!-- Expanded header for desktop -->
            <VListItem
                v-if="$navMode === 'desktop' && $navExpanded"
                prepend-icon="mdi-menu"
                append-icon="mdi-close"
                title="Site Navigation"
                @click="$navExpanded = false"
            />
            <!-- Collapsed header for mobile -->
            <VListItem
                v-if="$navMode === 'mobile' && !$navExpanded"
                color="warning"
                prepend-icon="mdi-menu"
                title="Swipe up for navigation"
                @click="$navExpanded = true"
            />

            <!-- Expanded header for mobile -->
            <VListItem
                v-if="$navMode === 'mobile' && $navExpanded"
                append-icon="mdi-close"
                title="Close Navigation"
                @click="$navExpanded = false"
            />

            <VDivider />

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
