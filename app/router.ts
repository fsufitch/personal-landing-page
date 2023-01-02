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
            path: '/projects',
            name: 'projects',
            component: () => import('@app/components/projects/ProjectsMain.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'page-not-found',
            component: () => import('@app/components/page-not-found/NotFound.vue'),
        },
    ],
});
