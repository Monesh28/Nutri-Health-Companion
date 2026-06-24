<script>
	import { goto } from '$app/navigation';
	import { authState } from '$lib/auth.svelte.js';
	import { loginWithEmail, loginWithGoogle, roleHome } from '$lib/firebase-data';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');

	$effect(() => {
		if (!authState.loading && authState.profile) {
			goto(roleHome(authState.profile.role));
		}
	});

	async function submitLogin(event) {
		event.preventDefault();
		loading = true;
		error = '';

		try {
			await loginWithEmail({ email, password });
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	async function submitGoogleLogin() {
		loading = true;
		error = '';

		try {
			await loginWithGoogle();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<section class="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10 sm:px-6">
	<div class="w-full rounded-md border border-slate-200 bg-white p-6 shadow-sm">
		<p class="text-sm font-semibold uppercase tracking-wide text-emerald-700">Authentication</p>
		<h1 class="mt-3 text-3xl font-bold text-slate-950">Login</h1>

		<form class="mt-6 space-y-4" onsubmit={submitLogin}>
			<label class="block">
				<span class="text-sm font-medium text-slate-700">Email</span>
				<input
					type="email"
					bind:value={email}
					required
					class="mt-1 w-full rounded-md border-slate-300"
					placeholder="student@example.com"
				/>
			</label>

			<label class="block">
				<span class="text-sm font-medium text-slate-700">Password</span>
				<input
					type="password"
					bind:value={password}
					required
					class="mt-1 w-full rounded-md border-slate-300"
					placeholder="password"
				/>
			</label>

			{#if error}
				<p class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
			{/if}

			<button
				type="submit"
				disabled={loading}
				class="w-full rounded-md bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
			>
				{loading ? 'Logging in...' : 'Login with Email'}
			</button>
		</form>

		<button
			type="button"
			onclick={submitGoogleLogin}
			disabled={loading}
			class="mt-3 w-full rounded-md border border-slate-300 px-4 py-3 font-semibold text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
		>
			Login with Google
		</button>

		<p class="mt-5 text-center text-sm text-slate-600">
			New student?
			<a href="/signup" class="font-semibold text-emerald-700 hover:text-emerald-800">Create an account</a>
		</p>
	</div>
</section>
