<template>
    <non-permanents-played />

    <div class="flex flex-col space-y-4" v-if="artifacts.length || enchantments.length">
        <h4 class="text-lg font-semibold font-beleren">
            Artifacts ({{ artifacts.length }}) / Enchantments ({{ enchantments.length }})
        </h4>
        <div class="grid grid-cols-5 gap-6">
            <card v-for="card in artifacts" :key="card.id" :card="card" />
            <card v-for="card in enchantments" :key="card.id" :card="card" />
        </div>
    </div>

    <div class="flex flex-col space-y-4" v-if="creatures.length">
        <h4 class="text-lg font-semibold font-beleren">Creatures ({{ creatures.length }})</h4>
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

import Card from './Card.vue';
import NonPermanentsPlayed from "./NonPermanentsPlayed.vue";
const components = {
    Card,
    NonPermanentsPlayed,
}

const artifacts = computed(() => store.getters['challengeDeck/boardArtifacts']);
const enchantments = computed(() => store.getters['challengeDeck/boardEnchantments']);
const creatures = computed(() => store.getters['challengeDeck/boardCreatures']);
</script>