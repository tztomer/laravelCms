import Vuex from 'vuex';

import projectStore from './modules/project.mod.js';
import userStore from './modules/user.mod.js';

export const store = Vuex.createStore({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
	modules: {
		project: projectStore,
		user: userStore,
	},
});
