import axiosClint from '../../axios.js';
const tepProjects = [
	{
		id: 100,
		title: 'New Project in Manhattan',
		slug: 'new-project-in-manhattan',
		status: 'Active',
		url: 'https://www.israel-properties.com/tzfat-np-tzfat01',
		img_url:
			'https://www.burnhamnationwide.com/hs-fs/hubfs/Locations/city-road-street-buildings.jpg?width=640&name=city-road-street-buildings.jpg',
		desc: 'Building One City is a plan for fundamental transformation at the New York City Department of Buildings',
		created_at: '2021-12-20 18:00:00',
		updated_at: '2021-12-20 19:00:00',
		expire_date: '2020-10-06',
		comments: [
			{ id: 1, type: 'textarea', comment: 'To be review on the second month' },
			{ id: 5, type: 'textarea', comment: 'To be review on the second week' },
		],
	},
	{
		id: 101,
		title: 'New Project in Manhattan NYC',
		slug: 'new-project-in-manhattan-nyc',
		status: 'Cancel',
		url: 'https://www.israel-properties.com/tzfat-np-tzfat01',
		img_url:
			'https://media.architecturaldigest.com/photos/579120d246eb3e65136a5212/master/w_1920%2Cc_limit/buzzworthy-buildings-brooklyn-01.jpg',
		desc: 'Building One City is a plan for fundamental transformation at the New York City Department of Buildings',
		created_at: '20-02-2020',
		updated_at: '2021-12-20 19:00:00',
		expire_date: '2020-10-06',
		comments: [{ id: 2, type: 'textarea', comment: 'To be review on the second month' }],
	},
	{
		id: 103,
		title: 'New Project in Manhattan Live',
		slug: 'new-project-in-manhattan-live',
		status: 'Done',
		url: 'https://www.israel-properties.com/tzfat-np-tzfat01',
		img_url:
			'https://www.ubm-development.com/magazin/wp-content/uploads/2020/03/kl-main-building-d-Kopie-1024x576.jpg',
		desc: 'Building One City is a plan for fundamental transformation at the New York City Department of Buildings',
		created_at: '2021-12-20 18:00:00',
		updated_at: '2021-12-20 19:00:00',
		expire_date: '2020-10-06',
		comments: [{ id: 3, type: 'textarea', comment: 'To be review on the second month' }],
	},
];
const projectStore = {
	state: {
		name: 'projectStore',
		projects: [...tepProjects],
		currentProject: {
			loading: false,
			data: {},
		},
	},
	getters: {
		projectLoading({ currentProject }) {
			console.log('loading getters', currentProject.loading);
			return currentProject.loading;
		},

		getProjects({ projects }) {
			return projects;
		},
		getProject({ currentProject }) {
			// console.log('current getter projedct ', currentProject.data);

			return JSON.parse(JSON.stringify(currentProject.data));
			// console.log('getter curr', currentProject);
		},
	},

	mutations: {
		removeProject({ projects }, { id }) {
			console.log('id', id);
			const idx = projects.findIndex((project) => project.id === id);
			console.log('project index', idx);
		},

		setLoading(state, loadingStatus) {
			console.log('loading status mu', loadingStatus);
			state.currentProject.loading = loadingStatus;
		},

		setProject(state, { data }) {
			state.currentProject.data = data.data;
			console.log('set project mutations', state.currentProject);
		},

		// saveProject(state, { data }) {
		// 	state.projects = [...state.projects, data];
		// },
		// updateProject(state, { data }) {
		// 	state.projects = state.projects.map((p) => {
		// 		if (p.id === data.id) {
		// 			return data;
		// 		}
		// 		return p;
		// 	});
		// },
	},

	actions: {
		async removeProject({ commit }, id) {
			console.log('id action', id);
			await commit({ type: 'removeProject', id });
		},

		async getProject({ commit }, id) {
			try {
				commit('setLoading', true);
				const { data } = await axiosClint(`/project/${id}`);
				commit('setProject', { data });
				commit('setLoading', false);
				console.log('data from get project', data);
				return data;
			} catch (error) {
				commit('setLoading', false);
				throw error;
			}
		},
		async saveProject({ commit }, project) {
			console.log('save project', project);
			try {
				delete project.img_url;
				if (project.id) {
					const { data } = await axiosClint.put(`/project/${project.id}`, project);
					commit('setProject', data);
					console.log('data put', data);
					return data;
				} else {
					const { data } = await axiosClint.post('/project', project);
					commit('setProject', data);
					console.log('data new', data);
					return data;
				}
			} catch (error) {
				console.log('error from action save', error);
			}
		},
	},
};

export default projectStore;
