<script>
	import { goto } from '$app/navigation';
	import { authState } from '$lib/auth.svelte.js';
	import { roleHome } from '$lib/firebase-data';

	$effect(() => {
		if (!authState.loading && authState.profile) {
			goto(roleHome(authState.profile.role));
		}
	});
</script>

<section class="mx-auto grid min-h-[70vh] max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
	<div>
		<p class="text-sm font-semibold uppercase tracking-wide text-emerald-700">Teaching project</p>
		<h1 class="mt-4 max-w-3xl text-4xl font-bold text-slate-950 sm:text-5xl">
			Simple Firebase CRUD with Auth, Firestore and Storage
		</h1>
		<p class="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
			A small classroom app where admins assign tasks and upload shared files, while students
			update task status and view uploaded resources.
		</p>

		<div class="mt-8 flex flex-wrap gap-3">
			<a href="/login" class="rounded-md bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700">
				Login
			</a>
			<a href="/signup" class="rounded-md border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-white">
				Create student account
			</a>
		</div>
	</div>

	<div class="grid gap-4">
		<div class="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
			<p class="font-semibold text-slate-950">Collections</p>
			<p class="mt-2 text-sm text-slate-600">users, tasks, files</p>
		</div>
		<div class="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
			<p class="font-semibold text-slate-950">Authentication</p>
			<p class="mt-2 text-sm text-slate-600">Email/password signup, email login and Google login</p>
		</div>
		<div class="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
			<p class="font-semibold text-slate-950">Storage</p>
			<p class="mt-2 text-sm text-slate-600">Admin uploads files to Firebase Storage for every student</p>
		</div>
	</div>
</section>
