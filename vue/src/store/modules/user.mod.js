import axiosClint from '../../axios.js';

const userStore = {
	state: {
		name: 'userStore',
		test: 'test',
		user: {
			data: {},
			token:
				sessionStorage.getItem('TOKEN'),
		},
	},
	getters: {
		getToken({ user }) {
			return user.token;
		},
		getUser({ user }) {
			console.log('data', user.data);
			return user.data;
		},
		test() {
			return 'Hello';
		},
	},
	mutations: {
		logout({ user }) {
			console.log('im in mutation');
			(user.data = {}),
				(user.token = null);
			sessionStorage.removeItem(
				'TOKEN',
			);
		},
		setUser(state, userData) {
			console.log(
				'data from mutation',
				userData,
			);
			state.user.data = userData.user;
			state.user.token = userData.token;
			sessionStorage.setItem(
				'TOKEN',
				userData.token,
			);
		},
	},
	actions: {
		async register({ commit }, user) {
			const { data } =
				await axiosClint.post(
					'/register',
					user,
				);

			commit('setUser', data);
			return data;
		},
		async login({ commit }, user) {
			console.log('data', user);
			try {
				const { data } =
					await axiosClint.post(
						'/login',
						user,
					);

				commit('setUser', data);
				return data;
			} catch (error) {
				throw error;
			}
		},
		async logout({ commit }) {
			try {
				await axiosClint.post(
					'/logout',
				);

				commit('logout');
			} catch (error) {
				throw error;
			}
		},
	},
};

export default userStore;
