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
        <div class="grid grid-cols-3 col-span-3 gap-6 p-6 bg-black border-4 border-neutral-600 rounded-xl bg-opacity-70">
            <card-stacks />
        </div>

        <div class="col-span-2 p-6 bg-neutral-900 rounded-xl">
            <life-counter />
        </div>
    </div>

    <div class="flex flex-col p-6 space-y-6 text-left bg-black border-4 border-neutral-600 rounded-xl bg-opacity-70">
        <div class="flex justify-center py-4 text-center">
            <!-- ALL ACTIONS IN HERE... -->
            <!-- START GAME -->
            <div v-if="!gameStarted" class="flex flex-col space-y-2">
                <p>Click below to get started, we'll ask a few questions before we begin.</p>
                <div class="flex justify-center space-x-2">
                    <btn :label="'Start Game'" @click="startGame" />
                </div>
            </div>

            <div v-if="gameStarted && !deckTypeChosen" class="flex flex-col space-y-2">
                <p>First, are you playing with a Commander/EDH deck?</p>
                <div class="flex justify-center space-x-2">
                    <btn :label="'Yes'" :colour="'green'" @click="playingCommander(true)" />
                    <btn :label="'no'" :colour="'red'" @click="playingCommander(false)" />
                </div>
            </div>

            <div v-if="deckTypeChosen && !playerFirstChosen" class="flex flex-col space-y-2">
                <p>Second, are you going first?</p>
                <div class="flex justify-center space-x-2">
                    <btn :label="'Yes'" :colour="'green'" @click="playerFirst(true)" />
                    <btn :label="'no'" :colour="'red'" @click="playerFirst(false)" />
                </div>
            </div>

            <div v-if="readyToStart" class="flex flex-col space-y-2">
                <div>
                    <p>Alright, we're ready to start.</p>
                    <p v-if="playerIsFirst">Take your desired amount of setup turns, then hit the "Start Game" button to start the opponent's turn.</p>
                </div>
                <div class="flex justify-center space-x-2">
                    <btn :label="'Start Playing!'" :colour="'green'" @click="startFirstTurn" />
                </div>
            </div>

            <!-- START COMBAT -->
            <div v-if="waitingForCombat" class="flex flex-col space-y-2">
                <div>
                    <p>The opponent wants to move to combat.</p>
                </div>

                <div class="flex justify-center space-x-2">
                    <btn :label="'Start Combat'" :colour="'red'" @click="startCombat" />
                </div>
            </div>

            <!-- BLOCKERS DECLARED -->
            <div v-if="waitingForBlockers" class="flex flex-col space-y-2">
                <div>
                    <p>Declare your blocks against the opponent by clicking the appropriate button on each creature.</p>
                    <p>Once you're done, click the button below.</p>
                </div>

                <div class="flex justify-center space-x-2">
                    <btn :label="'Blockers Declared'" :colour="'green'" @click="blockersDeclared" />
                </div>
            </div>

            <!-- START PLAYER TURN -->
            <div v-if="waitingForPlayerTurn" class="flex flex-col space-y-2">
                <div>
                    <p>The opponent has finished playing its turn.</p>
                    <p>Play out your turn now, and click the button below to pass the turn back to the opponent.</p>
                </div>

                <div class="flex justify-center space-x-2">
                    <btn :label="'End your turn'" :colour="'red'" :size="'xl'" @click="endPlayerTurn" />
                </div>
            </div>

            <!-- END PLAYER TURN -->
        </div>

        <h3 class="text-3xl font-semibold font-beleren" v-if="currentTurn > 0">Battlefield</h3>

        <battle-field />
    </div>

    <div class="absolute bottom-0 left-0 flex flex-col justify-end w-full h-full opacity-70 -z-10">
        <div>
            <img :src="'/images/' + opponent + '_silhouette.png'" alt="">
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

    $evt.on('destroy-card', card => store.dispatch('challengeDeck/destroyCard', card));
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
const playerIsFirst = computed(() => store.getters['playerFirst']);
const playerFirstChosen = computed(() => store.getters['playerFirstChosen']);
const readyToStart = computed(() => store.getters['readyToStart']);
const currentTurn = computed(() => store.getters['currentTurn']);
const waitingForCombat = computed(() => store.getters['challengeDeck/waitingForCombat']);
const waitingForBlockers = computed(() => store.getters['challengeDeck/waitingForBlockers']);
const waitingForPlayerTurn = computed(() => store.getters['challengeDeck/waitingForPlayerTurn']);

// methods
const startGame = () => {
    store.dispatch('startGame');
}

const playingCommander = (commander) => {
    store.dispatch('playingCommander', commander);
    store.dispatch('lifeCounter/setLife', commander ? 40 : 20);
}

const playerFirst = (first) => {
    store.dispatch('playerFirst', first);
}

const startFirstTurn = () => {
    store.dispatch('startFirstTurn');
}

const startCombat = () => {
    store.dispatch('challengeDeck/startCombat');
}

const blockersDeclared = () => {
    store.dispatch('challengeDeck/blockersDeclared');
}

const endPlayerTurn = () => {
    store.dispatch('challengeDeck/endPlayerTurn');
}

// watchers
watch(gameInitialised, (newValue, oldValue) => {
    if (newValue && (newValue !== oldValue)) {
        store.dispatch('challengeDeck/loadDeck', opponent.value);
    }
}, { immediate: true });
</script>