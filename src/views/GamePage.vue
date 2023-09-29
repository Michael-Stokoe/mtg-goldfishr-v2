<template>
    <div class="grid grid-cols-3 pt-6 pb-12">
        <div>
            <router-link :to="{ name: 'home' }">
                <div class="flex space-x-2 text-gray-400 hover:text-white">
                    <div class="flex flex-col justify-center">
                        <i class="fa-solid fa-circle-chevron-left"></i>
                    </div>
                    <span class="text-xl">Go back</span>
                </div>
            </router-link>
        </div>
        <div class="flex justify-center w-full text-center">
            <h1 class="text-6xl font-semibold">{{ gameTitle }}</h1>
        </div>
    </div>

    <div class="grid grid-cols-5 gap-6 mb-6">
        <div class="grid grid-cols-3 col-span-3 gap-6 p-6 border-4 border-gray-600 rounded-xl">
            <div class="flex flex-col space-y-2">
                <h3 class="text-xl font-semibold">Library ({{ cardsInLibrary }}):</h3>
                <library />
            </div>

            <div class="flex flex-col space-y-2">
                <h3 class="text-xl font-semibold">Graveyard ({{ cardsInGraveyard }}):</h3>
                <img src="/images/emptyzone.png" class="flex w-48" alt="Empty Graveyard">
            </div>

            <div class="flex flex-col space-y-2">
                <h3 class="text-xl font-semibold">Exile ({{ cardsInExile }}):</h3>
                <img src="/images/emptyzone.png" class="flex w-48" alt="Empty Exile">
            </div>
        </div>

        <div class="col-span-2 p-6 bg-gray-800 rounded-xl">
            <life-counter />
        </div>
    </div>

    <div class="flex flex-col p-6 space-y-6 text-left border-4 border-gray-600 rounded-xl">
        <h3 class="text-xl font-semibold">Battlefield</h3>

        <div class="flex flex-col space-y-4" v-if="artifacts.length > 0 || enchantments.length > 0">
            <h4 class="text-lg font-semibold">Artifacts/Enchantments</h4>
            <div class="grid grid-cols-5 gap-6">
                <v-card v-for="card in artifacts" :key="card.id" :card="card" />
                <v-card v-for="card in enchantments" :key="card.id" :card="card" />
            </div>
        </div>

        <div class="flex flex-col space-y-4" v-if="creatures.length">
            <h4 class="text-lg font-semibold">Creatures</h4>
            <div class="grid grid-cols-5 gap-6">
                <v-card v-for="card in creatures" :key="card.id" :card="card" />
            </div>
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

onMounted(() => {
    store.dispatch('setupGame', opponent.value);
});

// components
import Library from '../components/Library.vue';
import LifeCounter from '../components/LifeCounter.vue';
import Card from '../components/Card.vue';

const components = {
    Library,
    LifeCounter,
    Card,
};

// computed props
const opponent = computed(() => route.params.opponent);
const gameInitialised = computed(() => store.getters['initialised']);
const gameTitle = computed(() => store.getters['title']);
const cardsInLibrary = computed(() => store.getters['challengeDeck/cardsInLibrary']);
const cardsInGraveyard = computed(() => store.getters['challengeDeck/cardsInGraveyard']);
const cardsInExile = computed(() => store.getters['challengeDeck/cardsInExile']);
const artifacts = computed(() => store.getters['challengeDeck/boardArtifacts']);
const enchantments = computed(() => store.getters['challengeDeck/boardEnchantments']);
const creatures = computed(() => store.getters['challengeDeck/boardCreatures']);

// watchers
watch(gameInitialised, (newValue, oldValue) => {
    if (newValue && (newValue !== oldValue)) {
        store.dispatch('challengeDeck/loadDeck', opponent.value);
    }
}, { immediate: true });
</script>



<!-- <script>
export default {
    name: 'GamePage',

    components: {

    },

    mounted() {
        this.$store.dispatch('setupGame', this.opponent);
    },

    unmounted() {
        this.$evt.off('game-initialised');
    },

    data: () => ({
        test: 0,
    }),

    computed: {
        opponent() {
            return this.$route.params.opponent;
        },

        gameInitialised() {
            return this.$store.getters['initialised'];
        },

        gameTitle() {
            return this.$store.getters['title'];
        },

        library() {
            return this.$store.getters['challengeDeck/library'];
        },
    },

    methods: {

    },
}
</script> -->