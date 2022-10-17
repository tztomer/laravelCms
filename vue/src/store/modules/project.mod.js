const tepProjects = [
	{
		id: 100,
		title: 'New Project in Manhattan',
		slug: 'new-project-in-manhattan',
		status: 'Active',
		url: 'https://www.israel-properties.com/tzfat-np-tzfat01',
		img: 'https://www.burnhamnationwide.com/hs-fs/hubfs/Locations/city-road-street-buildings.jpg?width=640&name=city-road-street-buildings.jpg',
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
		img: 'https://media.architecturaldigest.com/photos/579120d246eb3e65136a5212/master/w_1920%2Cc_limit/buzzworthy-buildings-brooklyn-01.jpg',
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
		img: 'https://www.ubm-development.com/magazin/wp-content/uploads/2020/03/kl-main-building-d-Kopie-1024x576.jpg',
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
		currentProject: {},
	},
	getters: {
		getProjects({ projects }) {
			return projects;
		},
		getProject({ currentProject }) {
			return currentProject;
			// console.log('getter curr', currentProject);
		},
	},
	mutations: {
		removeProject({ projects }, { id }) {
			console.log('id', id);
			const idx = projects.findIndex((project) => project.id === id);
			console.log('project index', idx);
		},
		getProject(state, { id }) {
			console.log('mutations', this.state.project);
			state.currentProject = state.projects.find((project) => project.id === id);
		},
	},
	actions: {
		async removeProject({ commit }, id) {
			console.log('id action', id);
			await commit({ type: 'removeProject', id });
		},
		async getProject({ commit }, id) {
			await commit({ type: 'getProject', id });
		},
	},
};

export default projectStore;
