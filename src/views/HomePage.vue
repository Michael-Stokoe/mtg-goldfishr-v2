<template>
    <div class="container mx-auto">
        <div class="grid grid-cols-3 gap-6">
            <game-selection-card :gameTitle="'Battle the Horde'" :image="'/images/minotaur.png'"
                :gameDescription="'Face of against the relentless Minotaur Horde'" :gameName="'minotaur'" />
            <game-selection-card :gameTitle="'Face the Hydra'" :image="'/images/hydra.png'" :disabled="true"
                :gameName="'hydra'" :gameDescription="'Cut off a head, another grows back.'" />
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