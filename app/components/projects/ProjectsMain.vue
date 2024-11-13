<script setup lang="ts">
import DiscordBoarBotImg from './discord-boar-bot.png';
import ChocolateDoomImg from './chocolate-doom.png';
import ShipSpinningImg from './ship-spinning.png';
import WireguardImg from './wireguard.png';
import PrezTweetingImg from './modern-day-presidential.png';
import FaviconImg from './favicon.png';
import { usePageMetadata } from '@app/page-metadata';

import { GITHUB_URL } from '@app/constants';
import ProjectCard from './ProjectCard.vue';

usePageMetadata().value = {
    title: 'Projects - @fsufitch',
    description: 'A curated selection of projects, intended to show off my various skills/adventures.',
};
</script>

<template>
    <VRow>
        <VCol cols="12" md="6" class="d-flex flex-column">
            <ProjectCard class="ma-2" :image="FaviconImg" href="https://github.com/fsufitch/personal-landing-page">
                <template #title>This Website!</template>
                <template #subtitle> You're reading it </template>
                <template #body>
                    <p>
                        This website you're viewing is both my greeting card to the world, and my testbed for all sorts
                        of frontend experiments. It is a combination of a collection of mostly-static pages, plus a
                        more-dynamic "journal" section.
                    </p>
                    <p>
                        It is written using a very fun mix of tech. The code itself is Typescript/SCSS and uses the Vue
                        framework. The site is styled using the Vuetify design framework.
                    </p>
                    <p>
                        The journal (aka blog) section of the project is actually a renderer for my articles (aka blog
                        posts) which are hosted in a
                        <a href="https://github.com/fsufitch/journal" target="_blank"> separate Github repository</a>.
                        The posts themselves are stored as YAML metadata and Markdown files. The journal web UI fetches
                        this metadata and text and renders it nicely for the reader. It also adds support for special
                        styling blocks in the Markdown documents (such as alerts, framed/captioned images, etc).
                    </p>
                </template>
            </ProjectCard>

            <ProjectCard class="ma-2" :image="DiscordBoarBotImg" href="https://github.com/fsufitch/discord-boar-bot">
                <template #title>Discord Boar Bot</template>
                <template #subtitle> Handy chatbot for all my friends</template>
                <template #body>
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
                </template>
            </ProjectCard>

            <ProjectCard class="ma-2" :image="ShipSpinningImg" href="https://github.com/fsufitch/prez-tweet">
                <template #title>Ship Spinning Inc.</template>
                <template #subtitle> Virtual slot machine for a virtual universe </template>
                <template #body>
                    <p>
                        Ship Spinning Inc. was a web based slot machine game built around
                        <a href="http://eveonline.com">Eve Online</a>, a massively-multiplayer online game. Ship
                        Spinning connected with Eve via a complex XML API and created a system in which Eve Online
                        players could use their in-game "credits" currency to activate a web-based animated slot
                        machine, with which they could win in-game items prizes. The system integrated with other APIs,
                        in order to measure and ensure good payouts and to better engage players. Over its lifetime, it
                        provided entertainment for over 1000 players, and distributed prizes worth thousands of dollars
                        (if converted from in-game currency).
                    </p>
                    <p>
                        While it has no longer been maintained, its source code is still available online. Its user
                        interface was a custom jQuery-based site. The server was built in Python, using the web2py
                        framework and a SQLite database, and it was deployed on a virtual private server.
                    </p>
                </template>
            </ProjectCard>
        </VCol>
        <VCol cols="12" md="6" class="d-flex flex-column">
            <ProjectCard class="ma-2" :image="WireguardImg" href="https://github.com/fsufitch/wg-vlan">
                <template #title><code>wg-vlan</code></template>
                <template #subtitle> Wireguard VLAN helper</template>
                <template #body>
                    <p>
                        <a href="https://wireguard.com" target="_blank">Wireguard <VIcon icon="mdi-open-in-new" /></a>
                        is a fast, simple, powerful VPN. Its configuration/management for can be a little complicated to
                        get going smoothly... Or at least they were for me.
                    </p>
                    <p>
                        Since my main use case is creating a VLAN organized around a central server, I made this tool
                        for managing the requisite configurations.
                    </p>
                </template>
            </ProjectCard>

            <ProjectCard class="ma-2" :image="ChocolateDoomImg" href="https://github.com/chocolate-doom/chocolate-doom">
                <template #title>Chocolate Doom</template>
                <template #subtitle> (minor contributions) </template>
                <template #body>
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
                </template>
            </ProjectCard>

            <ProjectCard class="ma-2" :image="PrezTweetingImg" href="https://github.com/fsufitch/prez-tweet">
                <template #title>Preztweeting.com</template>
                <template #subtitle> A cry for help, maybe </template>
                <template #body>
                    <p>
                        As a quick coding exercise to refresh myself on building webpages using Angular, I decided to
                        create a simple web UI allowing side-by-side comparison of two Twitter feeds — in this case, two
                        US presidents'. The UI allows individual manipulation of each feed, or a "synchronized" time,
                        alternating which feed scrolls back to keep the displayed tweets as contemporaneous as possible.
                    </p>
                    <p>
                        While it has no longer been maintained, its source code is still available online. The user
                        interface is coded using Angular and styled using Bootstrap. It is backed by a lightweight
                        Go-based webserver that uses a Postgres database for indexing tweets, and runs regular crawls to
                        keep the index up to date. It runs on Heroku and is deployed in a way that allows for seamless
                        horizontal scaling in case of going viral.
                    </p>
                </template>
            </ProjectCard>
        </VCol>
    </VRow>

    <VAlert class="ma-2" color="info">
        <VIcon icon="mdi-github"></VIcon>
        See more at my Github! <a :href="GITHUB_URL"> {{ GITHUB_URL }} </a>
    </VAlert>
</template>
