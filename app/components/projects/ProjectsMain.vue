<script setup lang="ts">
import DiscordBoarBotImg from './discord-boar-bot.png';
import ChocolateDoomImg from './chocolate-doom.png';
import ShipSpinningImg from './ship-spinning.png';
import { usePageMetadata } from '@app/page-metadata';

import { GITHUB_URL } from '@app/constants';

usePageMetadata().value = {
    title: 'Projects - @fsufitch',
    description: 'A curated selection of projects, intended to show off my various skills/adventures.',
};
</script>

<template>
    <VRow>
        <VSpacer />
        <VCol cols="12" lg="8" xl="6">
            <VAlert>
                <VIcon icon="mdi-github"></VIcon>
                See more at my Github! <a :href="GITHUB_URL"> {{ GITHUB_URL }} </a>
            </VAlert>
        </VCol>
        <VSpacer />
    </VRow>

    <VSpacer />

    <VRow>
        <VSpacer />
        <VCol cols="12" lg="8" xl="6">
            <VCard>
                <VImg class="d-none d-md-block" :src="DiscordBoarBotImg" width="256px" style="float: right" />
                <VCardTitle> Discord Boar Bot </VCardTitle>
                <VCardText>
                    <VImg class="d-md-none mx-auto" :src="DiscordBoarBotImg" width="256px" />
                    <p>
                        <a href="https://discord.com" target="_blank">Discord<VIcon icon="mdi-open-in-new" /></a>
                        is a VoIP platform oriented towards providing text/voice communication to groups of video gamers
                        who connnect with each other online. In order to aid with moderation and to add some useful
                        functionality shortcuts to the group that my friends and I belong to, I used its 3rd party API
                        to build a bot. Features include custom "usergroups", canned responses, automated ACL, and more.
                    </p>
                    <p>
                        The bot was originally built using Python 2.6 (making use of the asyncio API), and is backed by
                        a Postgres database. It used to run in Heroku, but has since migrated to a small instance in
                        AWS.
                    </p>
                    <p>
                        <a href="https://github.com/fsufitch/discord-boar-bot" target="_blank">
                            Check it out on Github! <VIcon icon="mdi-open-in-new" />
                        </a>
                    </p>
                </VCardText>
            </VCard>
        </VCol>
        <VSpacer />
    </VRow>

    <VSpacer />

    <VRow>
        <VSpacer />
        <VCol cols="12" lg="8" xl="6">
            <VCard>
                <VImg class="d-none d-md-block" :src="ChocolateDoomImg" width="256px" style="float: right" />
                <VCardTitle> Chocolate Doom </VCardTitle>
                <VCardSubtitle> Minor contributions </VCardSubtitle>
                <VCardText>
                    <VImg class="d-md-none mx-auto" :src="ChocolateDoomImg" width="256px" />
                    <p>
                        <a href="https://www.chocolate-doom.org" target="_blank">
                            Chocolate Doom <VIcon icon="mdi-open-in-new" />
                        </a>
                        is a faithful reproduction (port) of the original 1993 Doom game.
                    </p>
                    <p>
                        I contributed a "dev container" setup to make developing it much easier to develop regardless of
                        what the computer being used is. I also helped debug and improve some issues regarding the
                        game's performance when running on an old Raspberry Pi.
                    </p>
                    <p>
                        Speaking of running Doom on a very old Raspberry Pi... Here it is on a Raspberry Pi 1 model A!
                    </p>
                    <p class="text-disabled">(BCM2835 700 MHz single-core processor, 256 MB RAM)</p>
                    <br />
                    <VRow>
                        <VSpacer />
                        <VCol cols="12" lg="8" xl="6">
                            <iframe
                                class="mx-auto"
                                style="width: 100%; height: 20em"
                                src="https://www.youtube-nocookie.com/embed/zbBMhfSF3Hw"
                                title="YouTube video player"
                                frameborder="0"
                                allowfullscreen
                            ></iframe>
                        </VCol>
                        <VSpacer />
                    </VRow>
                </VCardText>
            </VCard>
        </VCol>
        <VSpacer />
    </VRow>

    <VSpacer />

    <VRow>
        <VSpacer />
        <VCol cols="12" lg="8" xl="6">
            <VCard>
                <VImg class="d-none d-md-block" :src="ShipSpinningImg" width="256px" style="float: right" />
                <VCardTitle> Ship Spinning Inc. </VCardTitle>
                <VCardText>
                    <VImg class="d-md-none mx-auto" :src="ShipSpinningImg" width="256px" />
                    <p>
                        As a quick coding exercise to refresh myself on building webpages using Angular, I decided to
                        create a simple web UI allowing side-by-side comparison of two Twitter feeds — in this case, two
                        US presidents'. The UI allows individual manipulation of each feed, or a "synchronized" time,
                        alternating which feed scrolls back to keep the displayed tweets as contemporaneous as possible.
                    </p>
                    <p>
                        The user interface is coded using Angular and styled using Bootstrap. It is backed by a
                        lightweight Go-based webserver that uses a Postgres database for indexing tweets, and runs
                        regular crawls to keep the index up to date. It runs on Heroku and is deployed in a way that
                        allows for seamless horizontal scaling in case of going viral.
                    </p>
                    <p>
                        <a href="https://github.com/fsufitch/prez-tweet" target="_blank">
                            Check it out on Github! <VIcon icon="mdi-open-in-new" />
                        </a>
                    </p>
                </VCardText>
            </VCard>
        </VCol>
        <VSpacer />
    </VRow>
</template>
