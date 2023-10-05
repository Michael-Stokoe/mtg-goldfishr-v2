<template>
    <div @click="$evt.emit('toggle-settings-modal')"
        class="absolute top-0 left-0 z-50 w-screen h-screen bg-black opacity-80"></div>

    <div
        class="absolute flex flex-col p-6 space-y-4 -translate-x-1/2 z-[60] max-w-5xl -translate-y-1/2 shadow-xl top-1/2 left-1/2 rounded-xl bg-neutral-800">
        <h2 class="text-3xl font-semibold font-beleren">Settings</h2>

        <div>
            <div class="relative flex items-start">
                <div class="flex items-center h-6">
                    <input v-model="autoSubtract" id="auto-subtract" aria-describedby="auto-subtract-description"
                        name="auto-subtract" type="checkbox"
                        class="w-4 h-4 rounded text-neutral-600 border-neutral-300 focus:ring-neutral-600">
                </div>
                <div class="ml-3 text-sm leading-6">
                    <label for="auto-subtract" class="font-medium text-neutral-100">Auto-subtract damage</label>
                    <p id="auto-subtract-description" class="text-neutral-400">
                        Automatically subtract from life total when an unblocked creature deals damage.
                    </p>
                </div>
            </div>

            <div class="relative flex items-start">
                <div class="flex items-center h-6">
                    <input disabled v-model="autoResolve" id="auto-resolve" aria-describedby="auto-resolve-description"
                        name="auto-resolve" type="checkbox"
                        class="w-4 h-4 rounded text-neutral-600 border-neutral-300 focus:ring-neutral-600">
                </div>
                <div class="ml-3 text-sm leading-6">
                    <label for="auto-resolve" class="font-medium text-neutral-400">Auto-resolve spells</label>
                    <p id="auto-resolve-description" class="text-neutral-400">
                        If you don't run counter-magic, keep this selected. (Disabled until stack interaction feature is
                        implemented)
                    </p>
                </div>
            </div>
        </div>

        <div class="flex justify-center">
            <div>
                <btn :label="'Close'" @click="$evt.emit('toggle-settings-modal')" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

import Btn from '../components/Btn.vue';
import { useStore } from 'vuex';

const store = useStore();

const components = {
    Btn,
};

const autoSubtract = computed({
    get: () => store.getters['challengeDeck/autoSubtract'],
    set: (value) => store.dispatch('challengeDeck/changeAutoSubtract', value),
});

const autoResolve = computed({
    get: () => store.getters['stack/autoResolveSpells'],
    set: (value) => store.dispatch('stack/changeAutoResolve', value),
});
</script>