<template>
    <div class="flex">
        <div class="relative flex" @mouseenter="hovering = true" @mouseleave="hovering = false">
            <div v-show="hovering" v-if="exile.length > 0"
                class="absolute top-0 left-0 z-50 flex flex-col justify-center w-full h-full bg-black rounded-lg cursor-pointer opacity-80">
                <div class="flex flex-col justify-center text-center">
                    <span class="p-2 text-lg cursor-pointer text-neutral-300 hover:text-white hover:bg-neutral-800"
                        @click="showExileModal">
                        See Full Contents
                    </span>
                </div>
            </div>

            <img src="/images/emptyzone.png" class="flex w-48" alt="Empty Exile">

            <img v-if="exile.length > 0" :src="topCard.image" alt="Exiled Card" class="absolute z-10 w-48 rounded-xl">
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

// Computed props
const exile = computed(() => store.getters['challengeDeck/exile']);
const topCard = computed(() => exile.value[exile.value.length - 1]);

// Data
const hovering = ref(false);

// Methods
const showExileModal = () => $evt.emit('show-exile-modal');
</script>