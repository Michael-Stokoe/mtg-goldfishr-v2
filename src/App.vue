<template>
  <main class="container py-12 mx-auto">
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
  
  <div class="fixed bottom-0 flex flex-col w-full p-6 space-y-2 bg-black">
    <div class="flex justify-center space-x-4">
      <a class="hover:underline hover:text-gray-300" href="https://github.com/Michael-Stokoe/mtg-goldfishr-v2" target="_blank">GitHub Repo</a>
      <a class="hover:underline hover:text-gray-300" href="https://linktr.ee/stokoe0990" target="_blank">Support Me</a>
    </div>
    <div class="flex justify-center">
      <p class="italic text-neutral-300">Goldfishr is an independant project, not affiliated with WoTC in any way.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const store = useStore();
const route = useRoute();
const router = useRouter();
</script>