<template>
	<section class="outer-container">
		<!-- <app-header class="header" /> -->

		<router-view />
		<app-footer />
	</section>
</template>

<script>
	import appHeader from './cmps/app-header.vue';
	import DefaultLayout from './cmps/DefaultLayout.vue';
	import appFooter from './cmps/app-footer.vue';
	// import { userService } from './services/user.service'

	export default {
		data() {
			return {};
		},
		computed: {
			// headerLocation() {
			//     let { params, path } = this.$route || {};
			//     console.log(typeof Object.keys(params).length);
			// },
		},
		components: {
			appHeader,
			appFooter,
			DefaultLayout,
		},
	};
</script>
