import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import store from './store';
import emitter from './plugins/mitt.js';
import vClickOutside from "click-outside-vue3";
import anime from 'animejs';

window.$evt = emitter;
window.$anime = anime;

const app = createApp(App);
app.use(router).use(store).use(vClickOutside);
app.config.globalProperties.$evt = emitter;
app.mount('#app');
