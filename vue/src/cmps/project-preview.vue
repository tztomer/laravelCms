<template>
	<div
		class="flex flex-col justify-between rounded-sm py-2 px-3 shadow-md bg-white hover:bg-gray-50 h-[480px]"
	>
		<div class="img-wrapper relative">
			<span class="px-3 py-2 absolute bg-gray-900 text-white text-xs p-3">{{
				project.created_at
			}}</span>
			<img
				class="w-full h-48 object-cover"
				:src="project.img_url"
			/>
		</div>
		<div class="details_sec">
			<h4 class="mt-4 text-lg font-bold .text-gray-300">{{ project.title }}</h4>
			<div class="status">
				<span>Project Status: </span>
				<span
					:class="[
						project.status === 'Active'
							? 'text-blue-700'
							: project.status === 'Done'
							? 'text-green-700'
							: 'text-red-700',
					]"
					>{{ project.status }}</span
				>
			</div>
			<div class="website">
				<a
					:href="project.url"
					class="flex items-center decoration-solid text-blue-600 visited:text-purple-600"
					>Website
					<span><LinkIcon class="h-4 w-4 text-indigo-500 group-hover:text-indigo-400" /></span>
				</a>
			</div>
		</div>
		<p class="mt-4 font-light text-xs">{{ project.desc }}</p>

		<div class="comments mt-4 flex flex-col">
			<div v-for="(comment, i) in project.comments">
				<div
					class="bg-slate-100 shadow-md rounded-sm text-xs p-3"
					v-if="i <= 0"
				>
					{{ comment.comment.split(' ').slice(0, 7).join('  ') + ' ...' }}
				</div>
			</div>
		</div>
		<div class="edit_sec flex items-center justify-between">
			<router-link
				class="py-1 flex items-center px-2 w-20 text-sm text-white bg-gray-800 justify-around rounded-md hover:bg-emerald-600"
				:to="{ name: 'ProjectEdit', params: { id: project.id } }"
				><span>Edit</span> <PencilIcon class="h-4 w-4 text-white group-hover:text-indigo-400"
			/></router-link>

			<a @click="deleteProject(project.id)">
				<TrashIcon class="h-4 w-4 text-red-700 hover:text-red-400 cursor-pointer" />
			</a>
		</div>
	</div>
</template>
<script setup>
	import { LinkIcon } from '@heroicons/vue/20/solid';
	import { TrashIcon } from '@heroicons/vue/20/solid';
	import { PencilIcon } from '@heroicons/vue/20/solid';
	import { store } from '../store/store.js';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const props = defineProps({
		project: Object,
	});
	const deleteProject = async function (id) {
		// delete project
		await store.dispatch('deleteProject', id);
	};
</script>
