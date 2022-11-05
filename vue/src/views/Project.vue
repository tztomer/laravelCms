<template>
	<PageLayout>
		<template v-slot:header>
			<div class="flex justify-between items-center">
				<h1 class="text-3xl font-bold tracking-tight text-gray-900">
					{{ Route.params.id ? model.title : 'Create Project' }}
				</h1>
				<button
					@click.prevent="deleteProject()"
					v-show="Route.params.id"
					type="button"
					class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-700"
				>
					Delete Project <TrashIcon class="h-5 w-5 -mt-1 inline-block" />
				</button>
				<popupMsg
					@discard="deleteProject"
					@confirm="deleteProject"
					v-if="isClicked"
				>
					<template v-slot:popupContent>Do you sure you want to delete this project?</template>
				</popupMsg>
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

			<div v-else>
				<pre>{{ model }}</pre>
				<div class="md:grid md:grid-cols-3 md:gap-6">
					<div class="mt-5 md:col-span-2 md:mt-0">
						<form @submit.prevent="saveProject">
							<div class="shadow sm:overflow-hidden sm:rounded-md">
								<div class="space-y-6 bg-white px-4 py-5 sm:p-6">
									<div class="grid grid-cols-3 gap-6">
										<div class="col-span-3 sm:col-span-2">
											<label
												for="project-title"
												class="block text-sm font-medium text-gray-700"
												>Project Title</label
											>
											<div class="mt-1 flex rounded-md shadow-sm">
												<input
													type="text"
													v-model="model.title"
													name="project-title"
													class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													placeholder="Your project name"
												/>
											</div>
										</div>
									</div>
									<div class="grid grid-cols-3 gap-6">
										<div class="col-span-3 sm:col-span-2">
											<label
												for="company-website"
												class="block text-sm font-medium text-gray-700"
												>Website</label
											>
											<div class="mt-1 flex rounded-md shadow-sm">
												<span
													class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"
													>http://</span
												>
												<input
													type="text"
													v-model="model.url"
													name="company-website"
													id="company-website"
													class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													placeholder="www.example.com"
												/>
											</div>
										</div>
									</div>
									<div class="col-span-3 sm:col-span-2">
										<label
											for="status"
											class="block text-sm font-medium text-gray-700"
											>Project Status</label
										>
										<div class="mt-1 flex rounded-md shadow-sm">
											<!-- <pre>{{ model.status }}</pre> -->
											<select
												v-model="model.status"
												name="status"
												class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
											>
												<option>Active</option>
												<option>Done</option>
												<option>Cancel</option>
											</select>
										</div>
									</div>
									<div>
										<label
											for="desc"
											class="block text-sm font-medium text-gray-700"
											>Description</label
										>
										<div class="mt-1">
											<textarea
												name="desc"
												rows="3"
												v-model="model.desc"
												class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
												placeholder="Information about the project"
											/>
										</div>
									</div>
									<div class="col-span-3 sm:col-span-2">
										<label
											for="expire_date"
											class="block text-sm font-medium text-gray-700"
											>Expire Date</label
										>
										<div class="mt-1 flex rounded-md shadow-sm">
											<input
												v-model="model.expire_date"
												type="date"
												name="expire_date"
												class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
											/>
										</div>
									</div>

									<div>
										<label class="block text-sm font-medium text-gray-700"> Image </label>
										<div class="mt-1 flex items-center">
											<img
												v-if="model.img_url"
												:src="model.img_url"
												:alt="model.title"
												class="w-64 h-48 object-cover"
											/>
											<span
												v-else
												class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													class="h-[80%] w-[80%] text-gray-300"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fill-rule="evenodd"
														d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
														clip-rule="evenodd"
													/>
												</svg>
											</span>
											<button
												type="button"
												class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											>
												<input
													type="file"
													@change="onImageChoose"
													class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
												/>
												Change
											</button>
										</div>
									</div>
									<div class="px-4 py-3 sm:px-6">
										<button
											@click.prevent="addComment"
											class="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg--700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										>
											Add Comment
										</button>
									</div>
									<div
										v-if="!model.comments?.length"
										class="text-center text-gray-600"
									>
										You don't have any comments created
									</div>

									<div
										v-for="(comment, index) in model.comments"
										:key="comment.id"
									>
										<addComments
											:comment="comment"
											:index="index"
											@change="commentChange"
											@addComment="addComment"
											@saveComment="saveComment"
											@deleteComment="deleteComment"
										/>
									</div>
								</div>

								<div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
									<button
										class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									>
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</template>
	</PageLayout>
</template>
<script setup>
	import PageLayout from '../cmps/pageLayout.vue';
	import addComments from '../cmps/add-comments.vue';
	import popupMsg from '../cmps/user-msg.cmp.vue';

	import { ref, watchEffect, computed } from 'vue';
	import { store } from '../store/store.js';
	import { useRoute, useRouter } from 'vue-router';
	import { TrashIcon } from '@heroicons/vue/20/solid';

	// const emit = defineEmits(['show-msg']);
	const Router = useRouter();
	const Route = useRoute();
	const model = ref({
		title: null,
		desc: null,
		url: null,
		img_url: null,
		status: 'Active',
		expire_date: null,
		comments: [],
		slug: null,
	});

	const loading = computed(() => store.getters.projectLoading);

	watchEffect(
		() => store.getters.getProject,
		(newVal, oldVal) => {
			model.value = {
				...JSON.parse(JSON.stringify(newVal)),
			};
		},
	);

	if (Route.params.id) {
		const { id } = Route.params;
		console.log('project id from project page', id);
		(async function () {
			await store.dispatch('getProject', +id);
			return (model.value = store.getters.getProject);
		})();
	}

	function onImageChoose(ev) {
		// console.log(ev.target.files[0]);
		const file = ev.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			model.value.img = reader.result;
			model.value.img_url = reader.result;
		};
		reader.readAsDataURL(file);
	}

	function addComment() {
		const newComment = {
			id: Date.now(),
			type: 'text',
			comment: null,
		};

		model.value.comments.push(newComment);
		return;
	}

	function saveComment(comment) {
		// console.log('comment', comment);
		model.value.comments.slice(comment);
	}

	function deleteComment(comment) {
		model.value.comments = model.value.comments.filter((comm) => comm !== comment);
	}

	function commentChange(comment) {
		model.value.comments = model.value.comments.map((comm) => {
			if (comm.id === comment.id) {
				return JSON.parse(JSON.stringify(comment));
			}
		});
	}
	async function saveProject() {
		await store.dispatch('saveProject', model.value);

		Router.push({ name: 'Projects' });
		// console.log('data project page', data);
		// console.log('router', router.params);
	}
	const isClicked = ref(false);

	async function deleteProject(btn) {
		isClicked.value = true;

		if (btn === 'confirm') {
			console.log('dispatch store delete');
			const status = await store.dispatch('deleteProject', model.value.id);
			console.log('status code', typeof status, status);
			if (status === 204) Router.push({ name: 'Projects' });
		} else if (btn === 'discard') {
			isClicked.value = false;
		}
		console.log('project btn func', isClicked.value);
	}
</script>
