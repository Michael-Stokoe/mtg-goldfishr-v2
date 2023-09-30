<template>
    <div class="flex flex-col space-y-2">
        <h3 class="text-xl font-semibold font-beleren">Library ({{ cardsInLibrary }}):</h3>
        <library />
    </div>

    <div class="flex flex-col space-y-2">
        <h3 class="text-xl font-semibold font-beleren">Graveyard ({{ cardsInGraveyard }}):</h3>
        <img src="/images/emptyzone.png" class="flex w-48" alt="Empty Graveyard">
    </div>

    <div class="flex flex-col space-y-2">
        <h3 class="text-xl font-semibold font-beleren">Exile ({{ cardsInExile }}):</h3>
        <img src="/images/emptyzone.png" class="flex w-48" alt="Empty Exile">
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

import Library from '../components/Library.vue';

const components = {
    Library,
};

const cardsInLibrary = computed(() => store.getters['challengeDeck/cardsInLibrary']);
const cardsInGraveyard = computed(() => store.getters['challengeDeck/cardsInGraveyard']);
const cardsInExile = computed(() => store.getters['challengeDeck/cardsInExile']);

</script>