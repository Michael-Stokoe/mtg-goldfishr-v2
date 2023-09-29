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
</template>

<script>
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

    watch: {
        initialised(newVal, oldVal) {
            if (val && (newVal !== oldVal)) {
                this.store.dispatch('challengeDeck/loadDeck', this.opponent);
            }
        }
    }
}
</script>