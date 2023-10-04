<template>
    <div class="flex justify-center w-full text-center">
        <h1 class="text-6xl font-semibold text-neutral-300">Supporters</h1>
    </div>

    <div class="max-w-5xl py-6 mx-auto">
        <div class="flex space-x-2 text-neutral-400">
            <router-link :to="{ name: 'home' }">
                <div class="flex space-x-2 hover:text-white">
                    <div class="flex flex-col justify-center">
                        <i class="fa-solid fa-circle-chevron-left"></i>
                    </div>
                    <span class="text-xl">Go back</span>
                </div>
            </router-link>
        </div>
    </div>

    <div class="flex justify-center text-center">
        <div class="flex flex-col w-full max-w-5xl space-y-6">
            <div v-for="supporter in supporters"
                class="flex flex-col w-full p-6 space-y-3 text-left bg-black border-2 shadow-xl bg-opacity-80 border-neutral-300 rounded-xl">
                <h2 class="text-3xl font-semibold text-white">{{ supporter.name }}</h2>
                <p v-html="supporter.description" class="text-gray-500"></p>
                <p>Check him out here: <a :href="supporter.url" target="_blank"
                        class="text-xl text-gray-300 hover:underline hover:text-white"><i
                            class="ml-2 text-base fa-solid fa-link"></i> Socials</a></p>
            </div>
        </div>
    </div>

    <div class="flex max-w-5xl mx-auto mt-8">
        <a href="https://linktr.ee/stokoe0990" class="text-neutral-300 hover:text-white hover:underline">Get your name here
            by becoming a supporter</a>
    </div>
</template>

<script setup>
import { ref } from "vue";

const supporters = [
    {
        name: "DMP Alters",
        url: "https://linktr.ee/dmpalters",
        description: `DMP helped me out with numerous aspects of Goldfishr,
            and has been a great supporter of the project since the beginning.
            He's a great artist, and you should definitely check out his work!
            He's also a great streamer, and you can find him on his Twitch in the link below.`,
    }
];
</script>
