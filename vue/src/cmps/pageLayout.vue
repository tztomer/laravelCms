<template>
	<header class="bg-white relative shadow">
		<div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
			<h1 class="text-3xl font-bold tracking-tight text-gray-900">
				{{ title }}
			</h1>
			<slot name="header"></slot>
		</div>
	</header>
	<main>
		<div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
			<!-- Replace with your content -->
			<slot name="content"></slot>

			<!-- /End replace -->
		</div>
		<userMsg class="animate-fade-in-down"></userMsg>
	</main>
</template>
<script setup>
	import userMsg from '../cmps/user-msg.vue';
	const props = defineProps({
		title: String,
	});
</script>
