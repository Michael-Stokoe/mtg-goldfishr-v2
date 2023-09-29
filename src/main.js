import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import store from './store';
import emitter from './plugins/mitt.js';

window.$evt = emitter;

const app = createApp(App);
app.use(router).use(store);
app.config.globalProperties.$evt = emitter;
app.mount('#app');
