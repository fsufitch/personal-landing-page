import * as VueRouter from 'vue-router';

export default VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'about-me',
            component: () => import('@app/components/about-me/AboutMe.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@app/components/NotFound.vue'),
        },
    ],
});
