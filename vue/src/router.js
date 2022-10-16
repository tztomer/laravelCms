import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

import Dashboard from './views/Dashboard.vue';
import Project from './views/Project.vue';
import ProjectCreate from './views/ProjectCreate.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import AuthLayout from './cmps/AuthLayout.vue';
import NotFound from './views/NotFound.vue';
import DefaultLayout from './cmps/DefaultLayout.vue';
import Projects from './views/Projects.vue';
import { store } from './store/store.js';

const routes = [
	{
		path: '/',
		redirect: '/dashboard',
		component: DefaultLayout,
		meta: { requiresAuth: true },
		children: [
			{
				path: '/dashboard',
				name: 'Dashboard',
				component: Dashboard,
			},

			{
				path: '/projects',
				name: 'Projects',
				component: Projects,
			},
		],
	},
	{
		path: '/auth',
		redirect: '/login',
		name: 'Auth',
		component: AuthLayout,
		meta: { isGuest: true },
		children: [
			{
				path: '/login',
				name: 'Login',
				component: Login,
			},
			{
				path: '/register',
				name: 'Register',
				component: Register,
			},
		],
	},

	// {
	// 	path: '/:pathMatch(.*)*',
	// 	component: NotFound,
	// },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth && !store.getters.getToken) {
		next({ name: 'Login' });
	} else if (store.getters.getToken && to.meta.isGuest) {
		next({ name: 'Dashboard' });
	} else {
		next();
	}
});

// router.beforeEach((to, from, next) => {
// 	if (
// 		to.meta.requiresAuth &&

// 	) {
// 		next({ name: 'Login' });
// 	} else if (userToken && isGuest) {
// 		next({ name: 'Dashboard' });
// 	} else next();
// });

export default router;
