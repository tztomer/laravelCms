<template>
	<section class="form-container">
		<div
			class="w-full max-w-md space-y-8"
		>
			<RouterView></RouterView>
		</div>
	</section>
</template>

<script>
	import { LockClosedIcon } from '@heroicons/vue/20/solid';
	import { ref, onMounted } from 'vue';
	export default {
		components: {
			LockClosedIcon,
		},
	};
</script>
