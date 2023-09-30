<template>
    <div class="flex flex-col space-y-12 text-center">
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
                class="flex flex-col justify-center w-12 h-12 text-xl font-semibold rounded-full font-beleren bg-neutral-800 hover:text-neutral-800 hover:bg-neutral-500"
                @click="changeLife(-10)">-10</button>
            <button
                class="flex flex-col justify-center w-12 h-12 text-xl font-semibold rounded-full font-beleren bg-neutral-800 hover:text-neutral-800 hover:bg-neutral-500"
                @click="changeLife(-5)">-5</button>
            <button
                class="flex flex-col justify-center w-12 h-12 text-xl font-semibold rounded-full font-beleren bg-neutral-800 hover:text-neutral-800 hover:bg-neutral-500"
                @click="changeLife(-1)">-1</button>
            <button
                class="flex flex-col justify-center w-12 h-12 text-xl font-semibold rounded-full font-beleren bg-neutral-800 hover:text-neutral-800 hover:bg-neutral-500"
                @click="changeLife(1)">+1</button>
            <button
                class="flex flex-col justify-center w-12 h-12 text-xl font-semibold rounded-full font-beleren bg-neutral-800 hover:text-neutral-800 hover:bg-neutral-500"
                @click="changeLife(5)">+5</button>
            <button
                class="flex flex-col justify-center w-12 h-12 text-xl font-semibold rounded-full font-beleren bg-neutral-800 hover:text-neutral-800 hover:bg-neutral-500"
                @click="changeLife(10)">+10</button>
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

// computed props
const currentLife = computed(() => store.getters['lifeCounter/currentLife']);
const startingLife = computed(() => store.getters['lifeCounter/startingLife']);

// methods
const changeLife = (amount) => {
    store.dispatch('lifeCounter/changeLife', amount);
};
</script>