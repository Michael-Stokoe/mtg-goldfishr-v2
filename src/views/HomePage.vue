<template>
    <div class="container flex flex-col mx-auto space-y-6 text-center">
        <div>
            <p>
                <span class="font-beleren">Goldfishr</span> is the easiest way to test your decks' mettle. It will handle
                its own turns, casting
                spells and moving to combat, declare attackers, etc.
            </p>
            <p>We have a built-in life counter which will automatically deduct life lost from unblocked attackers and any
                spells
                cast by the opponent.</p>
            <p>Currently, only the original Theros block's "Battle the Horde" deck is ready, but we aim to have the other
                two
                done soon!</p>
            <p class="text-lg font-semibold">Get started by choosing your opponent below!</p>
        </div>

        <div class="grid grid-cols-3 gap-6">
            <game-selection-card :gameTitle="'Battle the Horde'" :image="'/images/minotaur.png'"
                :gameDescription="'Face of against the relentless Minotaur Horde'" :gameName="'minotaur'" />
            <game-selection-card :gameTitle="'Face the Hydra'" :image="'/images/hydra.png'" :gameName="'hydra'"
                :disabled="true" :gameDescription="'Cut off a head, another grows back.'" />
            <game-selection-card :gameTitle="'Defeat a God'" :image="'/images/god.png'" :disabled="true" :gameName="'god'"
                :gameDescription="'Xenagos and his revelers are coming for you.'" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

import GameSelectionCard from '../components/GameSelectionCard.vue';
const components = {
    GameSelectionCard
}
</script>