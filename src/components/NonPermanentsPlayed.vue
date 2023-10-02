<template>
    <div v-if="nonPermanentsPlayed.length" class="flex flex-col space-y-4">
        <p>The opponent cast the following non-permanent spells this turn:</p>

        <div class="grid grid-cols-5 gap-6">
            <card v-for="card in nonPermanentsPlayed" :key="card.id" :hideOverlay="true" :card="card" />
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

// components
import Card from './Card.vue';

const components = {
    Card,
};

const nonPermanentsPlayed = computed(() => store.getters['challengeDeck/nonPermanentsPlayed']);
</script>