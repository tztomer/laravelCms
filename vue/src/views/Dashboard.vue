<template>
	<pageLayout :title="name"> // content </pageLayout>
</template>
<script>
	import pageLayout from '../cmps/pageLayout.vue';
	export default {
		name: 'Dashboard',
		props: [],
		components: {
			pageLayout,
		},
		data() {
			return {
				name: 'Dashboard',
			};
		},
		methods: {},
		computed: {},
		created() {},
	};
</script>
