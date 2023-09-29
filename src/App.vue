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