<template>
    <div class="flex">
        <div class="relative" @mouseenter="hovering = true" @mouseleave="hovering = false">
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
                        @click="store.dispatch('challengeDeck/toggleBlock')" v-if="card.isAttacking">
                        <i class="w-6 fa-solid fa-shield"></i> <span>Block</span>
                    </p>
                    <p class="px-4 py-1 text-lg text-gray-300 cursor-pointer hover:text-white hover:bg-neutral-800"
                        @click="store.dispatch('challengeDeck/toggleLethalBlock')" v-if="card.isAttacking">
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
                    <span v-if="card.isBlockedAndDying">Lethal Blocked</span>
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
import { ref, computed, watch, onMounted, defineProps } from "vue";
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

const store = useStore();
const router = useRouter();
const route = useRoute();

const props = defineProps(['card', 'hideOverlay']);

const hovering = ref(false);

const cardIsTapped = computed(() => props.card.tapped);
const showAbilities = computed(() => props.card.abilities.length > 0);
const abilities = computed(() => props.card.abilities);
const showBlocked = computed(() => props.card.isBlocked || props.card.isBlockedAndDying);
const showPowerToughness = computed(() => props.card.superTypes.includes('Creature'));
const isAttacking = computed(() => props.card.isAttacking);
const isBlocked = computed(() => props.card.isBlocked);
const isBlockedAndDying = computed(() => props.card.isBlockedAndDying);
</script>