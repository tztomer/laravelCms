<template>
	<PageLayout>
		<template v-slot:header>
			<div class="flex justify-between items-center">
				<h1 class="text-3xl font-bold tracking-tight text-gray-900">
					{{ model.id ? model.title : 'Create Project' }}
				</h1>
			</div>
		</template>
		<template v-slot:content>
			<pre>{{ model }}</pre>

			<div>
				<div class="md:grid md:grid-cols-3 md:gap-6">
					<div class="mt-5 md:col-span-2 md:mt-0">
						<form @click.prevent="saveProject">
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
											<select
												v-model="model.status"
												name="status"
												class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
											>
												<option :value="model.status">{{ model.status }}</option>
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
												:value="model.expire_date"
												type="date"
												name="expire_date"
												class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
											/>
										</div>
									</div>

									<div>
										<label class="block text-sm font-medium text-gray-700">Cover photo</label>
										<div
											class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
										>
											<div class="space-y-1 text-center">
												<div class="">
													<svg
														v-if="!model.img"
														class="mx-auto h-12 w-12 text-gray-400"
														stroke="currentColor"
														fill="none"
														viewBox="0 0 48 48"
														aria-hidden="true"
													>
														<path
															d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
														/>
													</svg>
													<img
														v-else
														:src="model.img"
														class="w-64 h-48 object-cover"
													/>
												</div>
												<div class="flex text-sm text-gray-600">
													<label
														for="file-upload"
														class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
													>
														<span>Upload a file</span>
														<input
															id="file-upload"
															name="file-upload"
															type="file"
															class="sr-only"
														/>
													</label>
													<p class="pl-1">or drag and drop</p>
												</div>
												<p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
											</div>
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
										v-if="!model.comments.length"
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
	import { ref } from 'vue';
	import { store } from '../store/store.js';
	import { useRoute } from 'vue-router';
	const router = useRoute();
	const model = ref({
		title: '',
		image: null,
		desc: '',
		web_url: '',
		status: '',
		expire_date: null,
		comments: [],
	});

	const options = ref([
		{ text: 'Done', value: 'done' },
		{ text: 'Cancel', value: 'cancel' },
		{ text: 'Done', value: 'done' },
	]);

	if (router.params.id) {
		console.log('router', router.params.id);
		const { id } = router.params;
		(async function () {
			await store.dispatch('getProject', +id);
			model.value = store.getters.getProject;
			console.log('model', model.value);
		})();
	}

	function addComment(index) {
		const newComment = {
			id: Date.now(),
			type: 'text',
			comment: null,
		};
		console.log('index', index);
		model.value.comments.push(newComment);
		return;
	}

	function saveComment(comment) {
		console.log('comment', comment);
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
			return comm;
		});

		async function saveProject() {
			const data = await store.dispatch('saveProject', model.value);
			router.push({ name: 'Project', params: { id: data.data.id } });
		}
	}
</script>
