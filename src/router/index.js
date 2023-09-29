import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomePage.vue')
    },
    {
        path: '/:opponent',
        name: 'game',
        component: () => import('../views/GamePage.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;