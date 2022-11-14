<template>
	<div class="mt-4 overflow-hidden rounded-lg bg-white">
		<div class="relative">
			<textarea
				:name="'comment_' + model.id"
				v-model="model.comment"
				@change="dataChange"
				@focus="dataChange"
				:id="'comment_' + model.id"
				:class="[
					!isShow
						? 'bg-gray-100 block w-full border-0 shadow-none'
						: 'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
				]"
			/>
			<TrashIcon
				@click="deleteComment"
				class="h-5 w-5 -mt-1 text-red-700 inline-block absolute bottom-2 right-2 cursor-pointer"
			></TrashIcon>
		</div>
		<button
			v-if="isShow"
			@click.once="saveComment()"
			class="inline text-xs py-1 px-3 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
		>
			Save
		</button>
	</div>
</template>
<script setup>
	import { computed, ref } from 'vue';
	import { TrashIcon } from '@heroicons/vue/24/outline';
	const props = defineProps({
		comment: Object,
		index: Number,
	});

	const emit = defineEmits(['change', 'addComment', 'deleteComment', 'saveComment']);

	const model = ref(JSON.parse(JSON.stringify(props.comment)));
	const isShow = ref(true);
	// Emit the data change
	function dataChange() {
		const data = model.value;
		isShow.value = true;
		emit('change', data);
	}

	// function addComment() {
	// 	emit('addComment', props.comment);
	// 	return;
	// }
	function saveComment() {
		const data = model.value;
		emit('saveComment', props.index, data);
		isShow.value = false;
	}

	function deleteComment() {
		emit('deleteComment', props.comment);
	}
</script>
