import { createRouter, createWebHistory } from 'vue-router';

import FormPage from './pages/FormPage.vue';
import MainPage from './pages/MainPage.vue';
import NotFound from './pages/NotFound.vue';

import PhotoPage from './pages/PhotoPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/main' },
        {
            path: '/main',
            component: MainPage,
        },
        { path: '/form', component: FormPage },
        { path: '/PhotoPage', component: PhotoPage },
        { path: '/:notFound(.*)', component: NotFound },
    ],
});

export default router;