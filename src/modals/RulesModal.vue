<template>
    <div @click="$evt.emit('toggle-rules-modal')" class="bg-black opacity-80 absolute top-0 left-0 h-full w-full z-[55]">
    </div>

    <div
        class="z-[60] absolute flex flex-col max-w-5xl p-6 space-y-4 -translate-x-1/2 -translate-y-1/2 bg-neutral-800 shadow-xl rounded-xl top-1/2 left-1/2">
        <h2 class="text-3xl font-semibold text-center font-beleren">Rules/How to play</h2>
        <div class="flex flex-col space-y-2" v-html="rulesText"></div>

        <div class="flex justify-center">
            <div>
                <btn :label="'Close'" @click="$evt.emit('toggle-rules-modal')" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

import Btn from '../components/Btn.vue';

const components = {
    Btn,
};

const store = useStore();

const rulesText = computed(() => store.getters['challengeDeck/rulesText']);
</script>