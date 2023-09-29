<template>
    <div class="grid grid-cols-3">
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

    <div>
        <library />
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

// components
import Library from '../components/Library.vue';

const components = {
    Library,
};

const store = useStore();
const router = useRouter();
const route = useRoute();

const opponent = computed(() => route.params.opponent);

const gameInitialised = computed(() => store.getters['initialised']);

const gameTitle = computed(() => store.getters['title']);

watch(gameInitialised, (newValue, oldValue) => {
    if (newValue && (newValue !== oldValue)) {
        store.dispatch('challengeDeck/loadDeck', opponent.value);
    }
}, { immediate: true });

onMounted(() => {
    store.dispatch('setupGame', opponent.value);
});
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