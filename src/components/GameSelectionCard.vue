<template>
    <div class="flex flex-col space-y-4">
        <router-link :to="{
            name: 'game',
            params: {
                opponent: gameName,
            }
        }" :class="{
    'pointer-events-none': disabled,
    'transition-all cursor-pointer hover:scale-105': !disabled,
}">
            <div class="rounded-xl">
                <div class="flex">
                    <div class="relative">
                        <img :src="image" class="rounded-xl">
                        <div v-if="disabled"
                            class="absolute top-0 left-0 z-50 w-full h-full bg-black rounded-xl opacity-90">
                            <div class="flex flex-col justify-center h-full text-center">
                                <span class="text-3xl">Coming soon!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col mt-4 space-y-2 text-center">
                <h1 class="text-4xl font-semibold">{{ gameTitle }}</h1>

                <p>{{ gameDescription }}</p>
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineProps } from "vue";

const props = defineProps({
    image: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
        required: false,
    },
    gameTitle: {
        type: String,
        required: true,
    },
    gameDescription: {
        type: String,
        required: true,
    },
    gameName: {
        type: String,
        required: true,
    },
});
</script>