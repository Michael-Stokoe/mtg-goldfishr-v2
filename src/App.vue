<template>
  <main class="container py-12 pb-48 mx-auto">
    <div class="flex w-full pb-12 text-center" :class="{
      'flex-col': route.path === '/',
      'flex-row justify-center space-x-4': route.path !== '/'
    }">
      <div class="flex justify-center" v-if="route.path === '/'">
        <img src="/images/logo.png" alt="" class="w-48">
      </div>

      <div class="py-2" v-else>
        <img src="/images/logo.png" alt="" class="w-16">
      </div>

      <h1 class="font-semibold text-8xl">Goldfishr</h1>
    </div>

    <router-view></router-view>
  </main>

  <div @click="$evt.emit('toggle-rules-modal')" v-show="showRulesModalBackground"
    class="bg-black opacity-80 absolute top-0 left-0 h-full w-full z-[55]"></div>

  <div class="fixed bottom-0 flex flex-col w-full p-6 space-y-2 bg-black">
    <div class="flex justify-center space-x-4">
      <a class="hover:underline hover:text-gray-300" href="https://github.com/Michael-Stokoe/mtg-goldfishr-v2"
        target="_blank">GitHub Repo</a>
      <a class="hover:underline hover:text-gray-300" href="https://linktr.ee/stokoe0990" target="_blank">Support Me</a>
      <router-link :to="{ name: 'supporters' }" class="hover:underline hover:text-gray-300">Supporters</router-link>
    </div>
    <div class="flex justify-center">
      <p class="text-xs italic text-neutral-500">Goldfishr is an independant project, and not affiliated with WoTC in any
        way.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();

const holdingControl = ref(false);
const showRulesModalBackground = ref(false);

const listenerUp = (e) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (holdingControl.value) {
      $evt.emit('gain-life', 10);
      return;
    }

    $evt.emit('gain-life', 1);
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (holdingControl.value) {
      $evt.emit('lose-life', 10);
      return;
    }

    $evt.emit('lose-life', 1);
  }

  if (e.key === 'Control') {
    holdingControl.value = false;
  }
}

const listenerDown = (e) => {
  if (e.key === 'Control') {
    holdingControl.value = true;
  }
}

onMounted(() => {
  window.addEventListener("keyup", listenerUp);

  window.addEventListener("keydown", listenerDown);

  $evt.on('toggle-rules-modal', () => {
    showRulesModalBackground.value = !showRulesModalBackground.value;
  });
});

onUnmounted(() => {
  window.removeEventListener("keyup", listenerUp);

  window.removeEventListener("keydown", listenerDown);

  $evt.off('toggle-rules-modal');
});
</script>