<script>
	import { goto } from '$app/navigation';
	import { authState } from '$lib/auth.svelte.js';
	import { roleHome, signUpWithEmail } from '$lib/firebase-data';

	let fullName = $state('');
	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');

	$effect(() => {
		if (!authState.loading && authState.profile) {
			goto(roleHome(authState.profile.role));
		}
	});

	async function submitSignup(event) {
		event.preventDefault();
		loading = true;
		error = '';

		try {
			await signUpWithEmail({ fullName, email, password });
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<section class="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10 sm:px-6">
	<div class="w-full rounded-md border border-slate-200 bg-white p-6 shadow-sm">
		<p class="text-sm font-semibold uppercase tracking-wide text-emerald-700">Student account</p>
		<h1 class="mt-3 text-3xl font-bold text-slate-950">Signup</h1>

		<form class="mt-6 space-y-4" onsubmit={submitSignup}>
			<label class="block">
				<span class="text-sm font-medium text-slate-700">Full Name</span>
				<input
					type="text"
					bind:value={fullName}
					required
					class="mt-1 w-full rounded-md border-slate-300"
					placeholder="Asha Sharma"
				/>
			</label>

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
					minlength="6"
					class="mt-1 w-full rounded-md border-slate-300"
					placeholder="At least 6 characters"
				/>
			</label>

			<div class="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
				Role will be saved as <strong>student</strong> in Firestore.
			</div>

			{#if error}
				<p class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
			{/if}

			<button
				type="submit"
				disabled={loading}
				class="w-full rounded-md bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
			>
				{loading ? 'Creating account...' : 'Signup'}
			</button>
		</form>

		<p class="mt-5 text-center text-sm text-slate-600">
			Already registered?
			<a href="/login" class="font-semibold text-emerald-700 hover:text-emerald-800">Login</a>
		</p>
	</div>
</section>
