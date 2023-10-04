<template>
    <div class="flex flex-col space-y-2">
        <h3 class="text-xl font-semibold font-beleren">Library ({{ cardsInLibrary }}):</h3>
        <library />
    </div>

    <div class="flex flex-col space-y-2">
        <h3 class="text-xl font-semibold font-beleren">Graveyard ({{ cardsInGraveyard }}):</h3>
        <graveyard />
    </div>

    <div class="flex flex-col space-y-2">
        <h3 class="text-xl font-semibold font-beleren">Exile ({{ cardsInExile }}):</h3>
        <exile />
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

import Library from './Library.vue';
import Graveyard from './Graveyard.vue';
import Exile from './Exile.vue';

const components = {
    Library,
    Graveyard,
    Exile
};

const cardsInLibrary = computed(() => store.getters['challengeDeck/cardsInLibrary']);
const cardsInGraveyard = computed(() => store.getters['challengeDeck/cardsInGraveyard']);
const cardsInExile = computed(() => store.getters['challengeDeck/cardsInExile']);

</script>