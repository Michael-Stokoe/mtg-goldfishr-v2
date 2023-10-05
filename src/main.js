import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import store from './store';
import emitter from './plugins/mitt.js';
import vClickOutside from "click-outside-vue3";
import anime from 'animejs';
import { v4 as uuidv4 } from 'uuid';

window.$evt = emitter;
window.$anime = anime;
window.$uuid = uuidv4;

const app = createApp(App);
app.use(router).use(store).use(vClickOutside);
app.config.globalProperties.$evt = emitter;
app.mount('#app');
