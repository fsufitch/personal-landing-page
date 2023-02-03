<script setup lang="ts">
import FilipJPG from './filip.jpg';
import { ref } from 'vue';
import ContactInfoLoader from './ContactInfoLoader.vue';
import { usePageMetadata } from '@app/page-metadata';

const captchaPassed = ref(window.sessionStorage.getItem('aboutMeCaptchaPassed') || null);

const captchaX = Math.floor(Math.random() * 49 + 1);
const captchaY = Math.floor(Math.random() * 49 + 1);
const captchaSum = ref('');

const captchaValidate = () => {
    if (captchaX + captchaY === parseInt(captchaSum.value)) {
        window.sessionStorage.setItem('aboutMeCaptchaPassed', 'yes');
        captchaPassed.value = 'yes';
    } else {
        window.sessionStorage.removeItem('aboutMeCaptchaPassed');
        captchaPassed.value = null;
    }
};

const captchaInfoDialog = ref();

const $pageMetadata = usePageMetadata();
$pageMetadata.value = {
    title: 'Home - @fsufitch',
    description: 'this is my homepage on the web. Welcome!',
    image: FilipJPG,
};
</script>

<template>
    <VRow justify="center" align-content="center" class="fill-height">
        <VCol>
            <VCard>
                <VRow justify="center">
                    <VCol cols="fill">
                        <VCardTitle>
                            <br />
                            <h1>Filip Sufitchi</h1>
                        </VCardTitle>
                        <VCardSubtitle>
                            <div>
                                Senior Cloud Software Engineer <br />
                                Perfectionist Geek
                            </div>
                        </VCardSubtitle>
                        <VCardText>
                            <p>Hello and welcome to my corner of the Internet!</p>

                            <br />

                            <p>
                                I am a 30-something nerd with bytes of data flowing through my veins. I have been
                                manipulating computers to do my bidding my whole life, and am not about to stop. My
                                background is very varied, and ranges from coding well-structured front-ends for single
                                page applications, to building secure and performant backends (microservice or
                                monolithic), to continuous integration/deployment, and beyond... I love working with
                                complex systems, understanding them deeply, and using that knowledge to improve them.
                            </p>

                            <br />

                            <p><em>"Technology the right way"</em> is a lifestyle. Why not join me?</p>
                        </VCardText>
                    </VCol>
                    <VCol cols="4">
                        <VImg :src="FilipJPG" cover class="fill-height" />
                    </VCol>
                </VRow>
            </VCard>
        </VCol>
        <VCol cols="12" lg="4">
            <VCard>
                <template #title>
                    <h2>Contact Info</h2>
                </template>
                <template #append>
                    <VBtn variant="tonal" color="info" size="small" icon>
                        <VIcon icon="mdi-robot-off" />
                        <VDialog v-model="captchaInfoDialog" activator="parent" max-width="600px">
                            <VCard title="What is this?" prepend-icon="mdi-robot-off">
                                <VCardText>
                                    <p>
                                        Spam crawlers love searching the internet for potential targets. I am happy to
                                        show you my contact info &mdash; it's on my resume as well, after all &mdash;
                                        but I need to hide it from the bots.
                                    </p>
                                    <br />
                                    <p>
                                        Thus, the info is only decoded and displayed if you can solve a simple math
                                        problem.
                                    </p>
                                </VCardText>
                                <VCardActions>
                                    <VSpacer />
                                    <VBtn variant="tonal" @click="captchaInfoDialog = false">OK</VBtn>
                                </VCardActions>
                            </VCard>
                        </VDialog>
                    </VBtn>
                </template>

                <VCardText>
                    <ContactInfoLoader v-if="captchaPassed" />

                    <VForm v-if="!captchaPassed" @submit.prevent="captchaValidate">
                        <VTextField v-model.number="captchaSum"> {{ captchaX }} + {{ captchaY }} =&nbsp;</VTextField>
                        <VBtn variant="elevated" color="success" type="submit"> I am not a robot </VBtn>
                    </VForm>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>
