<template>
	<div>
		<img
			class="mx-auto h-12 w-auto"
			src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
			alt="Your Company"
		/>
		<h2
			class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
		>
			Login To Your Dashboard
		</h2>
		<p
			class="mt-2 text-center text-sm text-gray-600"
		>
			Or
			{{ ' ' }}
			<router-link
				to="/register"
				class="font-medium text-indigo-600 hover:text-indigo-500"
			>
				Register for free
			</router-link>
		</p>
	</div>
	<div
		class="bg-red-800 group relative flex w-full justify-center border-transparent py-4 px-4 text-sm font-medium text-white"
		v-show="errMsg"
	>
		{{ errMsg }}
	</div>

	<form
		class="mt-8 space-y-6"
		@submit.prevent="login"
	>
		<div
			class="-space-y-px rounded-md shadow-sm"
		>
			<div>
				<label
					for="email-address"
					class="sr-only"
					>Email address</label
				>
				<input
					id="email-address"
					v-model="user.email"
					type="email"
					autocomplete="email"
					required=""
					class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder="Email address"
				/>
			</div>
			<div>
				<label
					for="password"
					class="sr-only"
					>Password</label
				>
				<input
					id="password"
					name="password"
					type="password"
					v-model="user.password"
					autocomplete="current-password"
					required=""
					class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder="Password"
				/>
			</div>
		</div>

		<div
			class="flex items-center justify-between"
		>
			<div class="flex items-center">
				<input
					id="remember-me"
					v-model="user.remember"
					type="checkbox"
					class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
				/>
				<label
					for="remember-me"
					class="ml-2 block text-sm text-gray-900"
					>Remember me</label
				>
			</div>
		</div>

		<div>
			<button
				class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				<span
					class="absolute inset-y-0 left-0 flex items-center pl-3"
				>
					<LockClosedIcon
						class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
						aria-hidden="true"
					/>
				</span>
				Login
			</button>
		</div>
	</form>
</template>

<script setup>
	import { LockClosedIcon } from '@heroicons/vue/20/solid';

	import { ref } from 'vue';
	import { store } from '../store/store.js';
	import { useRouter } from 'vue-router';

	const errMsg = ref();
	const router = useRouter();
	const user = {
		email: '',
		password: '',
		remember: false,
	};

	async function login() {
		try {
			await store.dispatch(
				'login',
				user,
			);
			router.push({
				name: 'Dashboard',
			});
		} catch ({ response }) {
			console.log('res', response);

			errMsg.value =
				response.data.error;

			setTimeout(() => {
				errMsg.value = false;
			}, 3000);
			throw response;
		}
	}
</script>
