<template>
    <div class="flex">
        <div class="relative" @mouseenter="hovering = true" @mouseleave="hovering = false">
            <div v-show="!!damageDealt" id="damage_dealt"
                class="absolute top-0 z-40 px-4 py-2 -translate-x-1/2 bg-red-600 border border-red-900 shadow-lg left-1/2 rounded-xl">
                <span class="text-xl font-beleren">-{{ damageDealt }}</span>
            </div>

            <div v-if="hovering && !hideOverlay"
                class="absolute top-0 left-0 z-50 w-full h-full transition-transform bg-black rounded-xl opacity-80" :class="{
                    'rotate-90 translate-x-10': cardIsTapped,
                }">
                <div class="flex flex-col justify-center h-full text-center">
                    <p class="px-4 py-1 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-neutral-800"
                        @click="store.dispatch('challengeDeck/tapCard', card)" v-if="!card.tapped">
                        <i class="w-6 fa-solid fa-arrow-rotate-right"></i> <span>Tap</span>
                    </p>
                    <p class="px-4 py-1 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-neutral-800"
                        @click="store.dispatch('challengeDeck/untapCard', card)" v-if="card.tapped">
                        <i class="w-6 fa-solid fa-arrow-rotate-left"></i> <span>Untap</span>
                    </p>
                    <p class="px-4 py-1 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-neutral-800"
                        @click="store.dispatch('challengeDeck/toggleBlock', card)" v-if="card.isAttacking">
                        <i class="w-6 fa-solid fa-shield"></i> <span>Block</span>
                    </p>
                    <p class="px-4 py-1 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-neutral-800"
                        @click="store.dispatch('challengeDeck/toggleLethalBlock', card)" v-if="card.isAttacking">
                        <i class="w-6 fa-solid fa-shield-virus"></i> <span>Lethal Block</span>
                    </p>
                    <p class="px-4 py-1 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-neutral-800"
                        @click="store.dispatch('challengeDeck/destroyCard', card)">
                        <i class="w-6 fa-solid fa-skull-crossbones"></i> <span>Destroy</span>
                    </p>
                    <p class="px-4 py-1 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-neutral-800"
                        @click="store.dispatch('challengeDeck/exileCard', card)">
                        <i class="w-6 fa-solid fa-ban"></i> <span>Exile</span>
                    </p>
                </div>
            </div>

            <div class="relative transition-transform" :class="{
                'rotate-90 translate-x-10': cardIsTapped,
            }">
                <img :src="card.image" alt="" class="w-48 shadow-lg rounded-xl" :class="{
                    'ring-red-600 ring-[5px] rounded-xl': isAttacking,
                }">

                <div v-if="showAbilities"
                    class="absolute flex flex-col px-2 py-1 text-xs text-gray-900 -translate-y-1/2 bg-gray-200 top-1/2 left-3 rounded-xl">
                    <span v-for="ability in abilities" :key="ability">{{ ability }}</span>
                </div>

                <div v-if="showBlocked"
                    class="absolute flex flex-col px-2 py-1 text-xs text-gray-900 -translate-y-1/2 bg-gray-200 top-1/2 right-3 rounded-xl">
                    <span v-if="card.isBlocked">Blocked</span>
                    <span v-if="card.isBlockedLethal">Lethal Blocked</span>
                </div>

                <div v-if="showPowerToughness"
                    class="absolute px-2 py-1 text-xs font-bold text-gray-900 bg-gray-200 rounded-xl bottom-2 right-3">
                    {{ card.power }} / {{ card.toughness }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineProps, onUnmounted } from "vue";
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

const props = defineProps(['card', 'hideOverlay']);

onMounted(() => {
    $evt.on('card-deals-damage', (card) => {
        if (card.id === props.card.id) {
            showDamage(card.power);
        }
    });
});

onUnmounted(() => {
    $evt.off('card-deals-damage');
});

// methods
const showDamage = amount => {
    damageDealt.value = amount;

    $anime.timeline({
        duration: 3000,
    }).add({
        targets: '#damage_dealt',
        translateY: -30,
    });

    setTimeout(() => {
        damageDealt.value = null;
    }, 2500);
}

// data
const hovering = ref(false);
const damageDealt = ref(null);
const damage_dealt = ref(null);

// computed
const cardIsTapped = computed(() => props.card.tapped);
const showAbilities = computed(() => props.card.abilities.length > 0);
const abilities = computed(() => props.card.abilities);
const showBlocked = computed(() => props.card.isBlocked || props.card.isBlockedLethal);
const showPowerToughness = computed(() => props.card.superTypes.includes('Creature'));
const isAttacking = computed(() => props.card.isAttacking);
const isBlocked = computed(() => props.card.isBlocked);
const isBlockedLethal = computed(() => props.card.isBlockedLethal);
</script>