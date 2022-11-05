<template>
	<div class="popup">
		<slot name="popupContent">
			<p>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente minus, consequatur
				possimus in, sunt est repellat similique facere magni dolorum suscipit accusantium obcaecati
				porro iure et, enim amet doloribus delectus?
			</p>
		</slot>
		<div class="button-wrapper">
			<button
				@click="deleteOrDiscard(deleteBtn)"
				type="button"
			>
				{{ deleteBtn.toUpperCase() }}
			</button>
			<button
				@click="deleteOrDiscard(discardBtn)"
				type="button"
			>
				{{ discardBtn.toUpperCase() }}
			</button>
		</div>
		<!-- /End replace -->
	</div>
</template>
<script setup>
	import { computed, ref } from 'vue';
	import { TrashIcon } from '@heroicons/vue/24/outline';
	const props = defineProps({
		comment: Object,
		index: Number,
	});
	const emit = defineEmits(['confirm', 'discard']);

	const deleteBtn = ref('confirm');
	const discardBtn = ref('discard');

	function deleteOrDiscard(btn) {
		btn === deleteBtn.value ? emit('confirm', btn) : emit('discard', btn);
	}
</script>
