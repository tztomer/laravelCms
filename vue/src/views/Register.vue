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
			Register For Free
		</h2>
		<p
			class="mt-2 text-center text-sm text-gray-600"
		>
			Or
			{{ ' ' }}
			<router-link
				to="/login"
				class="font-medium text-indigo-600 hover:text-indigo-500"
			>
				Login to you dashboard
			</router-link>
		</p>
	</div>
	<form
		class="mt-8 space-y-6"
		@submit.prevent="onFormSubmit()"
	>
		<input
			type="hidden"
			name="remember"
			value="true"
		/>
		<div
			class="-space-y-px rounded-md shadow-sm"
		>
			<pre>{{ user }}</pre>

			<div>
				<label
					for="name"
					class="sr-only"
					>Full Name</label
				>
				<input
					id="full-name"
					v-model="user.name"
					type="text"
					required=""
					autocomplete="name"
					name="name"
					class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder="Full Name"
				/>
			</div>
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
					class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
					class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder="Password"
				/>
			</div>
			<div>
				<label
					for="password_confirmation"
					class="sr-only"
					>Password Confirm</label
				>
				<input
					id="password_confirmation"
					name="password_confirmation"
					type="password"
					v-model="
						user.password_confirmation
					"
					required=""
					autocomplete="password_confirmation"
					class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					placeholder="Confirm Password"
				/>
			</div>
		</div>

		<div
			class="flex items-center justify-between"
		>
			<div class="flex items-center">
				<input
					id="remember-me"
					name="remember-me"
					class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
					:checked="user.checked"
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
				Sign in
			</button>
		</div>
	</form>
</template>

<script setup>
	import { LockClosedIcon } from '@heroicons/vue/20/solid';
	import { CheckIcon } from '@heroicons/vue/20/solid';
	// import { ref, onMounted } from 'vue';
	import { store } from '../store/store.js';
	import { useRouter } from 'vue-router';
	const router = useRouter();
	const user = {
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	};

	function onFormSubmit() {
		store
			.dispatch('register', user)
			.then(() => {
				router.push({
					name: 'Dashboard',
				});
			});
	}
</script>
