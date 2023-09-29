<template>
    <div class="flex">
        <div class="relative flex" @mouseenter="hovering = true" @mouseleave="hovering = false">
            <div v-show="hovering"
                class="absolute top-0 left-0 z-50 flex flex-col justify-center w-full h-full bg-black rounded-lg cursor-pointer opacity-80">
                <div class="flex flex-col justify-center text-center">
                    <span class="p-2 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-gray-800">
                        Mill X Cards
                    </span>
                </div>
            </div>

            <img src="/images/emptyzone.png" class="flex w-48" alt="Empty Library">

            <img v-if="library.length > 0" src="/images/cardback.png" alt="Library Card" class="absolute z-10 w-48">
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

onMounted(() => {
    // ...
});

onUnmounted(() => {
    // ...
});

// Computed props
const library = computed(() => store.getters['challengeDeck/library']);

// Data
const hovering = ref(false);

// Methods
</script>