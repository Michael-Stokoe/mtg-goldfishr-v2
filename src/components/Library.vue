<template>
    <div class="relative flex {{ getMargin() }}">
        <div class="relative" @mouseenter="hovering = true" @mouseleave="hovering = false">
            <div v-show="hovering" v-if="cardsInLibrary > 0"
                class="absolute top-0 left-0 z-50 flex flex-col justify-center w-full h-full bg-black rounded-lg cursor-pointer opacity-80 {{ getNegMargin() }}">
                <span class="p-2 text-center text-gray-300 hover:text-white">
                    Mill X Cards
                </span>
                <span class="p-2 text-center text-gray-300 hover:text-white">
                    Reveal X Cards
                </span>
            </div>
        </div>

        <img v-if="cardsInLibrary === 0" src="/img/emptyzone.png" class="flex w-48" alt="Empty Library">

        <img v-if="cardsInLibrary > 0" v-for="(card, index) in libraryRenderer" src="/img/cardback.png" alt="Library Card"
            class="absolute z-10 w-48 {{ getNegTop(index) }}" :key="card.id">
    </div>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        // Computed props
        const opponent = computed(() => route.params.opponent);
        const gameInitialised = computed(() => store.getters['initialised']);
        const library = computed(() => store.getters['challengeDeck/library']);
        const cardsInLibrary = computed(() => library.length);
        const libraryRenderer = computed(() => {
            if (cardsInLibrary > 60) {
                return library.slice(0, 10);
            }
            return library;
        });

        // Data
        const hovering = ref(false);

        // Methods
        const getMargin = () => {
            return cardsInLibrary > 10 ? 'mt-[18px]' : `mt-[${(cardsInLibrary - 1) * 2}px]`;
        }

        const getNegMargin = () => {
            return cardsInLibrary > 10 ? '-mt-[18px]' : `mt-[${(cardsInLibrary - 1) * 2}px]`;
        }

        const getNegTop = (index) => {
            return index > 10 ? '-top-[18px]' : `top-[${index * 2}px]`;
        }

        onMounted(() => {
            // ...
        });

        return {
            opponent,
            gameInitialised,
            hovering,
            library,
            cardsInLibrary,
            libraryRenderer,
            getMargin,
        }
    }
}
</script>