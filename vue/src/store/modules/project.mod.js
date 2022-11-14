import axiosClint from '../../axios.js';
// const tepProjects = [
// 	{
// 		id: 100,
// 		title: 'New Project in Manhattan',
// 		slug: 'new-project-in-manhattan',
// 		status: 'Active',
// 		url: 'https://www.israel-properties.com/tzfat-np-tzfat01',
// 		img_url:
// 			'https://www.burnhamnationwide.com/hs-fs/hubfs/Locations/city-road-street-buildings.jpg?width=640&name=city-road-street-buildings.jpg',
// 		desc: 'Building One City is a plan for fundamental transformation at the New York City Department of Buildings',
// 		created_at: '2021-12-20 18:00:00',
// 		updated_at: '2021-12-20 19:00:00',
// 		expire_date: '2020-10-06',
// 		comments: [
// 			{ id: 1, type: 'textarea', comment: 'To be review on the second month' },
// 			{ id: 5, type: 'textarea', comment: 'To be review on the second week' },
// 		],
// 	},
// 	{
// 		id: 101,
// 		title: 'New Project in Manhattan NYC',
// 		slug: 'new-project-in-manhattan-nyc',
// 		status: 'Cancel',
// 		url: 'https://www.israel-properties.com/tzfat-np-tzfat01',
// 		img_url:
// 			'https://media.architecturaldigest.com/photos/579120d246eb3e65136a5212/master/w_1920%2Cc_limit/buzzworthy-buildings-brooklyn-01.jpg',
// 		desc: 'Building One City is a plan for fundamental transformation at the New York City Department of Buildings',
// 		created_at: '20-02-2020',
// 		updated_at: '2021-12-20 19:00:00',
// 		expire_date: '2020-10-06',
// 		comments: [{ id: 2, type: 'textarea', comment: 'To be review on the second month' }],
// 	},
// 	{
// 		id: 103,
// 		title: 'New Project in Manhattan Live',
// 		slug: 'new-project-in-manhattan-live',
// 		status: 'Done',
// 		url: 'https://www.israel-properties.com/tzfat-np-tzfat01',
// 		img_url:
// 			'https://www.ubm-development.com/magazin/wp-content/uploads/2020/03/kl-main-building-d-Kopie-1024x576.jpg',
// 		desc: 'Building One City is a plan for fundamental transformation at the New York City Department of Buildings',
// 		created_at: '2021-12-20 18:00:00',
// 		updated_at: '2021-12-20 19:00:00',
// 		expire_date: '2020-10-06',
// 		comments: [{ id: 3, type: 'textarea', comment: 'To be review on the second month' }],
// 	},
// ];
const projectStore = {
	state: {
		name: 'projectStore',
		projects: {
			loading: false,
			data: [],
			pages: [],
		},
		currentProject: {
			loading: false,
			data: {},
		},
		notification: {},
	},
	getters: {
		projectLoading({ currentProject }) {
			console.log('loading getters', currentProject.loading);
			return currentProject.loading;
		},
		projectsLoading({ projects }) {
			console.log('loading projects', projects.loading);
			return projects.loading;
		},

		getProjects({ projects }) {
			return {
				list: projects.data,
				pages: projects.pages,
			};
		},
		getProject({ currentProject }) {
			return currentProject.data;
		},
	},

	mutations: {
		removeProject({ projects }, id) {
			console.log('id', id);
			const idx = projects.data.findIndex((project) => project.id === id);
			projects.data.splice(idx, 1);
			console.log('project index', idx);
		},

		setLoading(state, loadingStatus) {
			console.log('loading status mu', loadingStatus);
			state.currentProject.loading = loadingStatus;
		},
		projectsLoading({ projects }, loadingStatus) {
			projects.loading = loadingStatus;
		},

		setProject({ currentProject }, { data }) {
			console.log('data from set ', data);
			currentProject.data = data;
		},

		setProjects({ projects }, data) {
			projects.data = data.data;
			projects.pages = data.meta.links;
			console.log('projects', projects);
		},
	},

	actions: {
		async getProject({ commit }, id) {
			try {
				commit('setLoading', true);
				const { data } = await axiosClint(`/project/${id}`);
				commit('setProject', data);
				commit('setLoading', false);
				return data;
			} catch (error) {
				commit('setLoading', false);
				throw error;
			}
		},
		async saveProject({ commit }, project) {
			try {
				delete project.img_url;
				if (project.id) {
					const res = await axiosClint.put(`/project/${project.id}`, project);
					const { data } = res;
					commit('setProject', data);
					// commit('notify', res.config.method);

					return res;
				} else {
					const res = await axiosClint.post('/project', project);
					const { data } = res;
					commit('setProject', data);
					console.log('data new', data);
					return res;
				}
			} catch (error) {
				return error;
			}
		},
		async deleteProject({ commit }, id) {
			try {
				const { status } = await axiosClint.delete(`/project/${id}`);
				console.log('id:::', id);
				commit('removeProject', id);

				return status;
			} catch (error) {
				throw error;
			}
		},
		async getProjects({ commit }, url = '/project') {
			try {
				console.log('url:::', url);
				// url = url || '/project';
				commit('projectsLoading', true);
				const res = await axiosClint.get(url);
				commit('projectsLoading', false);
				console.log('res from get projects', res);
				const { data } = res;
				commit('setProjects', data);
				return data;
			} catch (error) {
				commit('projectsLoading', false);
				throw error;
			}
		},
	},
};

export default projectStore;
