<template>
    <div class="flex flex-col space-y-8 text-center">
        <h3 class="text-xl font-semibold font-beleren">Life Counter</h3>

        <div class="flex justify-center space-x-4">
            <div class="flex flex-col justify-center ">
                <i @click="changeLife(-1)"
                    class="text-2xl cursor-pointer text-neutral-500 fa-solid fa-circle-minus hover:text-white"></i>
            </div>
            <span class="font-bold text-8xl font-beleren">
                {{ currentLife.toString() }}
            </span>
            <div class="flex flex-col justify-center ">
                <i @click="changeLife(1)"
                    class="text-2xl cursor-pointer text-neutral-500 fa-solid fa-circle-plus hover:text-white"></i>
            </div>
        </div>

        <div class="flex justify-center space-x-2">
            <button
                class="flex flex-col justify-center w-12 h-12 text-xl font-semibold text-center rounded-full font-beleren bg-neutral-800 hover:text-neutral-800 hover:bg-neutral-500"
                @click="changeLife(-10)">
                <span class="w-full">-10</span>
            </button>
            <button
                class="flex flex-col justify-center w-12 h-12 text-xl font-semibold text-center rounded-full font-beleren bg-neutral-800 hover:text-neutral-800 hover:bg-neutral-500"
                @click="changeLife(-5)">
                <span class="w-full">-5</span>
            </button>
            <button
                class="flex flex-col justify-center w-12 h-12 text-xl font-semibold text-center rounded-full font-beleren bg-neutral-800 hover:text-neutral-800 hover:bg-neutral-500"
                @click="changeLife(-1)">
                <span class="w-full">-1</span>
            </button>
            <button
                class="flex flex-col justify-center w-12 h-12 text-xl font-semibold text-center rounded-full font-beleren bg-neutral-800 hover:text-neutral-800 hover:bg-neutral-500"
                @click="changeLife(1)">
                <span class="w-full">+1</span>
            </button>
            <button
                class="flex flex-col justify-center w-12 h-12 text-xl font-semibold text-center rounded-full font-beleren bg-neutral-800 hover:text-neutral-800 hover:bg-neutral-500"
                @click="changeLife(5)">
                <span class="w-full">+5</span>
            </button>
            <button
                class="flex flex-col justify-center w-12 h-12 text-xl font-semibold text-center rounded-full font-beleren bg-neutral-800 hover:text-neutral-800 hover:bg-neutral-500"
                @click="changeLife(10)">
                <span class="w-full">+10</span>
            </button>
        </div>

        <div class="flex justify-center space-x-2">
            <btn :label="'Rules / How To'" @click="toggleRulesModal">
                <template v-slot:append>
                    <div>
                        <i class="text-xs fa-solid fa-book"></i>
                    </div>
                </template>
            </btn>
            <btn :label="'Settings'" @click="toggleSettingsModal">
                <template v-slot:append>
                    <div>
                        <i class="text-xs fa-solid fa-gear"></i>
                    </div>
                </template>
            </btn>
            <btn :label="'Reset'" :colour="'red'" @click="resetGame">
                <template v-slot:append>
                    <div>
                        <i class="text-xs fa-solid fa-power-off"></i>
                    </div>
                </template>
            </btn>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

import Btn from './Btn.vue';

const components = {
    Btn,
};

onMounted(() => {
    $evt.on('gain-life', amount => changeLife(amount));
    $evt.on('lose-life', amount => changeLife(-amount));
});

// computed props
const currentLife = computed(() => store.getters['lifeCounter/currentLife']);
const startingLife = computed(() => store.getters['lifeCounter/startingLife']);

// methods
const changeLife = (amount) => {
    store.dispatch('lifeCounter/changeLife', amount);
};

const toggleRulesModal = () => {
    $evt.emit('toggle-rules-modal');
};

const toggleSettingsModal = () => {
    $evt.emit('toggle-settings-modal');
};

const resetGame = () => {
    store.dispatch('resetGame');
};
</script>