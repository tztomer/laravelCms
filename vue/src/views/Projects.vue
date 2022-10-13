<template>
	<dashboardHeading :title="name">
	</dashboardHeading>
</template>
<script>
	import dashboardHeading from '../cmps/dashboardHeader.vue';
	export default {
		name: 'Projects',
		props: [],
		components: {
			dashboardHeading,
		},
		data() {
			return {
				name: 'Projects',
			};
		},
		methods: {},
		computed: {},
		created() {},
	};
</script>
