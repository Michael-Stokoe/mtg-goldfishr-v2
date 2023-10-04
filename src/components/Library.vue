<template>
    <div class="flex">
        <div class="relative flex" @mouseenter="hovering = true" @mouseleave="hovering = false">
            <div v-show="hovering"
                class="absolute top-0 left-0 z-50 flex flex-col justify-center w-full h-full bg-black rounded-lg cursor-pointer opacity-80">
                <div class="flex flex-col justify-center text-center">
                    <span @click="showMillCardsDropdown"
                        class="p-2 text-lg cursor-pointer text-neutral-300 hover:text-white hover:bg-neutral-800">
                        Mill X Cards
                    </span>
                </div>
            </div>


            <div v-if="showMillCards" v-click-outside="hideMillCardsDropdown"
                class="absolute shadow-lg flex flex-col space-y-2 left-0 z-[60] p-2 border rounded-lg top-1/2 bg-neutral-600 border-neutral-400">
                <p class="text-neutral-200">Mill how many cards?</p>
                <input type="number" step="1" v-model="millAmount" min="0"
                    class="p-1 text-xs rounded shadow-inner text-neutral-600">
                <button class="px-2 py-1 text-xs rounded bg-neutral-900 text-neutral-300 hover:bg-neutral-800"
                    @click="millCards">Mill</button>
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
const millAmount = ref(0);
const showMillCards = ref(false);

// Methods
const millCards = () => {
    $evt.emit('mill-cards', millAmount.value);
    showMillCards.value = false;
    millAmount.value = 0;
}

const showMillCardsDropdown = () => {
    showMillCards.value = true;
}

const hideMillCardsDropdown = () => {
    showMillCards.value = false;
}
</script>