<template>
	<pageLayout>
		<template v-slot:header>
			<div class="flex justify-between items-center">
				<h1 class="text-3xl font-bold tracking-tight text-gray-900">Projects</h1>
				<router-link
					class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600"
					:to="{ name: 'ProjectCreate' }"
				>
					<PlusIcon class="h-5 w-5 -mt-1 inline-block"></PlusIcon>
					Add New Project
				</router-link>
			</div>
		</template>
		<template v-slot:content>
			<div class="project-item grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
				<!-- {{ projects }} -->
				<projectPreview
					v-for="(project, index) in projects"
					:key="project.id"
					:project="project"
				>
				</projectPreview>
			</div>
		</template>
	</pageLayout>
</template>
<script setup>
	import pageLayout from '../cmps/pageLayout.vue';
	import projectPreview from '../cmps/project-preview.vue';
	import { PlusIcon } from '@heroicons/vue/20/solid';

	import { store } from '../store/store.js';
	import { computed } from 'vue';

	const projects = computed(() => {
		// (async () => {
		// Code that runs in your function
		// const projects = await store.dispatch('getProjects');
		// })();

		return store.getters.getProjects;
	});
</script>
