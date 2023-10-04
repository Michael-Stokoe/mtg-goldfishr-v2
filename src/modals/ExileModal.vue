<template>
    <div class="absolute top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-80" @click="closeModal"></div>

    <div class="absolute z-[60] p-8 -translate-x-1/2 -translate-y-1/2 shadow-xl top-1/2 left-1/2 bg-neutral-800 rounded-xl">
        <h1 class="text-4xl font-semibold text-center font-beleren">Exile</h1>

        <div class="grid max-w-5xl grid-cols-5 gap-4 my-6 overflow-y-scroll max-h-[480px] p-6 bg-neutral-900 rounded-l-xl">
            <div v-for="card in exile" :key="card.id" class="flex flex-col justify-center">
                <img :src="card.image" alt="Exile Card" class="w-48 rounded-xl">
            </div>
        </div>

        <div class="flex justify-center">
            <div>
                <btn :label="'Close'" :colour="'red'" :size="'xl'" @click="closeModal" />
            </div>
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

// components
import Btn from '../components/Btn.vue';

const components = {
    Btn,
};

onMounted(() => {
    // ...
});

onUnmounted(() => {
    // ...
});

// Methods
const closeModal = () => {
    $evt.emit('close-exile-modal');
}

// Computed props
const exile = computed(() => store.getters['challengeDeck/exile']);
</script>