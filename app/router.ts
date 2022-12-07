import * as VueRouter from 'vue-router';

export default VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@app/components/Home.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@app/components/NotFound.vue'),
        },
    ],
});
