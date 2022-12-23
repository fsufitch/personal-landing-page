<script setup lang="ts">
import DiscordBoarBotImg from './discord-boar-bot.png';
</script>

<template>
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
                        AWS. {{ DiscordBoarBotImg }}
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

    <VDivider />

    <VRow>
        <VSpacer />
        <VCol cols="12" lg="8">
            <VCard>
                <template #title> Preztweeting.com </template>
            </VCard>
        </VCol>
        <VSpacer />
    </VRow>

    <VDivider />

    <VRow>
        <VSpacer />
        <VCol cols="12" lg="8">
            <VCard>
                <template #title> Ship Spinning Inc. </template>
            </VCard>
        </VCol>
        <VSpacer />
    </VRow>
</template>
