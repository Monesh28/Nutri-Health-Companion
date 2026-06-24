<script>
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import './layout.css';
	import { authState, startAuthListener } from '$lib/auth.svelte.js';
	import favicon from '$lib/assets/favicon.svg';
	import { logout, roleHome } from '$lib/firebase-data';

	let { children } = $props();

	let navItems = $derived.by(() => {
		if (!authState.profile) {
			return [
				{ href: '/login', label: 'Login' },
				{ href: '/signup', label: 'Signup' }
			];
		}

		if (authState.profile.role === 'admin') {
			return [
				{ href: '/admin/dashboard', label: 'Dashboard' },
				{ href: '/admin/tasks', label: 'Tasks' },
				{ href: '/admin/files', label: 'Files' }
			];
		}

		return [
			{ href: '/student/dashboard', label: 'Dashboard' },
			{ href: '/student/files', label: 'Files' }
		];
	});

	onMount(() => {
		startAuthListener();
	});

	async function handleLogout() {
		await logout();
		goto('/login');
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen bg-slate-50 text-slate-950">
	<header class="border-b border-slate-200 bg-white">
		<div class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
			<a href="/" class="flex items-center gap-3">
				<span class="grid size-10 place-items-center rounded-md bg-emerald-600 font-bold text-white">F</span>
				<span>
					<span class="block text-lg font-bold">Firebase CRUD Class</span>
					<span class="block text-sm text-slate-500">Auth, Firestore and Storage</span>
				</span>
			</a>

			<nav class="flex flex-wrap items-center gap-2">
				{#each navItems as item (item.href)}
					<a
						href={item.href}
						class={[
							'rounded-md px-3 py-2 text-sm font-medium transition',
							page.url.pathname === item.href
								? 'bg-slate-950 text-white'
								: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
						]}
					>
						{item.label}
					</a>
				{/each}

				{#if authState.profile}
					<span class="hidden h-6 w-px bg-slate-200 sm:block"></span>
					<span class="text-sm text-slate-500">{authState.profile.fullName}</span>
					<button
						type="button"
						onclick={handleLogout}
						class="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
					>
						Logout
					</button>
				{/if}
			</nav>
		</div>
	</header>

	<main>
		{@render children()}
	</main>
</div>
