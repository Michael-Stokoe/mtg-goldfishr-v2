<template>
    <div class="flex flex-col space-y-4" v-if="showArtifactsAndEnchantments">
        <h4 class="text-lg font-semibold">Artifacts/Enchantments</h4>
        <div class="grid grid-cols-5 gap-6">
            <card v-for="card in artifacts" :key="card.id" :card="card" />
            <card v-for="card in enchantments" :key="card.id" :card="card" />
        </div>
    </div>

    <div class="flex flex-col space-y-4" v-if="creatures.length">
        <h4 class="text-lg font-semibold">Creatures</h4>
        <div class="grid grid-cols-5 gap-6">
            <card v-for="card in creatures" :key="card.id" :card="card" />
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

import Card from '../components/Card.vue';
const components = {
    Card,
}

const artifacts = computed(() => store.getters['challengeDeck/boardArtifacts']);
const enchantments = computed(() => store.getters['challengeDeck/boardEnchantments']);
const creatures = computed(() => store.getters['challengeDeck/boardCreatures']);

const showArtifactsAndEnchantments = computed(() => artifacts.length > 0 || enchantments.length > 0);
</script>