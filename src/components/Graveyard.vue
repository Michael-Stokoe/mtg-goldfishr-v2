<template>
    <div class="flex">
        <div class="relative flex" @mouseenter="hovering = true" @mouseleave="hovering = false">
            <div v-show="hovering"
                class="absolute top-0 left-0 z-50 flex flex-col justify-center w-full h-full bg-black rounded-lg cursor-pointer opacity-80">
                <div class="flex flex-col justify-center text-center">
                    <span class="p-2 text-lg cursor-pointer text-neutral-300 hover:text-white hover:bg-neutral-800">
                        See Full Contents
                    </span>
                </div>
            </div>

            <img src="/images/emptyzone.png" class="flex w-48" alt="Empty Graveyard">

            <img v-if="graveyard.length > 0" :src="topCard.image" alt="Graveyard Card" class="absolute z-10 w-48 rounded-xl">
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
const graveyard = computed(() => store.getters['challengeDeck/graveyard']);
const topCard = computed(() => graveyard.value[graveyard.value.length - 1]);

// Data
const hovering = ref(false);

// Methods
</script>