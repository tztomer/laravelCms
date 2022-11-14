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
			<div
				v-if="loading"
				class="loading text-3xl bg-black text-gray-100 left-0 absolute w-full h-full"
			>
				<div class="flex h-full justify-center items-center">
					{{ 'loading...' }}
				</div>
			</div>

			<div class="project-item grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
				<!-- <pre>	{{ projects.pages.length - 1 }}</pre> -->
				<projectPreview
					v-for="(project, index) in projects.list"
					:key="project.id"
					:project="project"
					class="animate-fade-in-down"
					:style="{ 'animation-delay': `${index * 0.2}s` }"
				>
				</projectPreview>

				<div class="flex justify-center mt-5">
					<nav
						class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
						aria-label="Pagination"
					>
						<!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
						<a
							v-for="(page, i) of projects.pages"
							:key="i"
							:disabled="!page.url"
							href="#"
							@click.prevent="getForPage(page)"
							aria-current="page"
							class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
							:class="[
								page.active
									? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
									: 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
								i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
								i === projects.pages.length - 1 ? 'rounded-r-md' : '',
							]"
							v-html="page.label"
						>
						</a>
					</nav>
				</div>
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

	const loading = computed(() => store.getters.projectsLoading);

	const projects = computed(() => {
		return store.getters.getProjects;
	});
	(async () => {
		// Code that runs in your function
		await store.dispatch('getProjects');
	})();

	function getForPage(page) {
		if (!page.url || page.active) {
			return;
		}
		const url = page.url;
		store.dispatch('getProjects', url);
	}
</script>
