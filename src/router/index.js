import { createRouter, createWebHashHistory } from 'vue-router';

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
    },
    {
        path:'/:pathName(.*)',
        name: 'NotFound',
        component: () => import('../views/HomePage.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;