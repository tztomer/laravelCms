<template>
	<dashboardHeading :title="name">
		// content
	</dashboardHeading>
</template>
<script>
	import dashboardHeading from '../cmps/dashboardHeader.vue';
	export default {
		name: 'Dashboard',
		props: [],
		components: {
			dashboardHeading,
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
