const userStore = {
	state: {
		name: 'userStore',
		user: {
			data: {},
			token:
				sessionStorage.getItem('TOKEN'),
		},
	},
	getters: {
		getToken({ user }) {
			console.log('token', user);
			return user.token;
		},
		getUser({ user }) {
			console.log('data', user.data);
			return user.data;
		},
	},
	mutations: {
		logout({ user }) {
			(user.data = {}),
				(user.token = null);
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
		register({ commit }, user) {
			console.log('user', user);
			return fetch(
				'http://localhost:8000/api/register',
				{
					headers: {
						'Content-Type':
							'application/json',
						Accept: 'application/json',
					},
					method: 'POST',
					body: JSON.stringify(user),
				},
			)
				.then((res) => res.json())
				.then((res) => {
					console.log('res', res);
					commit('setUser', res);
				});
		},
	},
};

export default userStore;
