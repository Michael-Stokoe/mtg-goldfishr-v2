<template>
    <div class="flex justify-center w-full text-center">
        <h1 class="text-6xl font-semibold text-neutral-300">{{ gameTitle }}</h1>
    </div>

    <div class="py-6">
        <router-link :to="{ name: 'home' }">
            <div class="flex space-x-2 text-neutral-400 hover:text-white">
                <div class="flex flex-col justify-center">
                    <i class="fa-solid fa-circle-chevron-left"></i>
                </div>
                <span class="text-xl">Go back</span>
            </div>
        </router-link>
    </div>

    <div class="grid grid-cols-5 gap-6 mb-6">
        <div class="grid grid-cols-3 col-span-3 gap-6 p-6 border-4 border-neutral-600 rounded-xl">
            <card-stacks />
        </div>

        <div class="col-span-2 p-6 bg-neutral-900 rounded-xl">
            <life-counter />
        </div>
    </div>

    <div class="flex flex-col p-6 space-y-6 text-left border-4 border-neutral-600 rounded-xl">
        <div class="flex justify-center py-4 text-center">
            <!-- ALL ACTIONS IN HERE... -->
            <!-- START GAME -->
            <div v-if="!gameStarted" class="flex flex-col space-y-2">
                <p>Click below to get started, we'll ask a few questions before we begin.</p>
                <div class="flex justify-center space-x-2">
                    <btn :label="'Start Game'" @click="startGame" />
                </div>
            </div>

            <div v-if="gameStarted && !deckTypeChosen">
                <p>First, are you playing with a Commander/EDH deck?</p>
                <div class="flex justify-center space-x-2">
                    <btn :label="'Yes'" :colour="'green'" @click="playingCommander(true)" />
                    <btn :label="'no'" :colour="'red'" @click="playingCommander(false)" />
                </div>
            </div>
            <!-- START COMBAT -->
            <!-- BLOCKERS DECLARED -->
            <!-- END COMBAT & CONTINUE -->
            <!-- START PLAYER TURN -->
            <!-- END PLAYER TURN -->
        </div>

        <h3 class="text-xl font-semibold">Battlefield</h3>

        <battle-field />
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
import LifeCounter from '../components/LifeCounter.vue';
import CardStacks from '../components/CardStacks.vue';
import BattleField from '../components/BattleField.vue';
import Btn from '../components/Btn.vue';

const components = {
    LifeCounter,
    CardStacks,
    BattleField,
    Btn,
};

// computed props
const opponent = computed(() => route.params.opponent);
const gameInitialised = computed(() => store.getters['initialised']);
const gameTitle = computed(() => store.getters['title']);
const gameStarted = computed(() => store.getters['started']);
const deckTypeChosen = computed(() => store.getters['deckTypeChosen']);

// methods
const startGame = () => {
    store.dispatch('startGame');
}

const playingCommander = (commander) => {
    store.dispatch('playingCommander', commander);
    $evt.emit('set-life', commander ? 40 : 20);
}

// watchers
watch(gameInitialised, (newValue, oldValue) => {
    if (newValue && (newValue !== oldValue)) {
        store.dispatch('challengeDeck/loadDeck', opponent.value);
    }
}, { immediate: true });
</script>