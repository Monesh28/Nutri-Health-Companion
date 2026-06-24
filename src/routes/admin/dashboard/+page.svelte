<script>
	import { subscribeTasks, subscribeUsers } from '$lib/firebase-data';
	import { onMount } from 'svelte';

	let users = $state([]);
	let tasks = $state([]);

	let students = $derived(users.filter((user) => user.role === 'student'));
	let admins = $derived(users.filter((user) => user.role === 'admin'));
	let counts = $derived({
		todo: tasks.filter((task) => task.status === 'todo').length,
		doing: tasks.filter((task) => task.status === 'doing').length,
		done: tasks.filter((task) => task.status === 'done').length
	});

	onMount(() => {
		const unsubscribeUsers = subscribeUsers((items) => {
			users = items;
		});

		const unsubscribeTasks = subscribeTasks((items) => {
			tasks = items;
		});

		return () => {
			unsubscribeUsers();
			unsubscribeTasks();
		};
	});
</script>

<section class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
		<div>
			<p class="text-sm font-semibold uppercase tracking-wide text-emerald-700">Admin</p>
			<h1 class="mt-2 text-3xl font-bold text-slate-950">Dashboard</h1>
		</div>

		<div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
				<p class="text-sm font-medium text-slate-500">All Users</p>
				<p class="mt-2 text-3xl font-bold text-slate-950">{users.length}</p>
			</div>
			<div class="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
				<p class="text-sm font-medium text-slate-500">Students</p>
				<p class="mt-2 text-3xl font-bold text-slate-950">{students.length}</p>
			</div>
			<div class="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
				<p class="text-sm font-medium text-slate-500">Admins</p>
				<p class="mt-2 text-3xl font-bold text-slate-950">{admins.length}</p>
			</div>
			<div class="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
				<p class="text-sm font-medium text-slate-500">Tasks</p>
				<p class="mt-2 text-3xl font-bold text-slate-950">{tasks.length}</p>
			</div>
		</div>

		<div class="mt-6 grid gap-4 sm:grid-cols-3">
			<div class="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
				<p class="text-sm font-medium text-slate-500">Todo</p>
				<p class="mt-2 text-3xl font-bold text-slate-950">{counts.todo}</p>
			</div>
			<div class="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
				<p class="text-sm font-medium text-slate-500">Doing</p>
				<p class="mt-2 text-3xl font-bold text-slate-950">{counts.doing}</p>
			</div>
			<div class="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
				<p class="text-sm font-medium text-slate-500">Done</p>
				<p class="mt-2 text-3xl font-bold text-slate-950">{counts.done}</p>
			</div>
		</div>

		<div class="mt-6 rounded-md border border-slate-200 bg-white p-5 shadow-sm">
			<h2 class="text-xl font-semibold text-slate-950">Recent tasks</h2>
			<div class="mt-4 divide-y divide-slate-100">
				{#each tasks.slice(0, 5) as task (task.id)}
					<div class="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p class="font-medium text-slate-950">{task.title}</p>
							<p class="text-sm text-slate-500">{task.userName} - {task.userEmail}</p>
						</div>
						<span class="w-fit rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold uppercase text-slate-600">
							{task.status}
						</span>
					</div>
				{:else}
					<p class="py-6 text-center text-slate-500">No tasks created yet.</p>
				{/each}
			</div>
		</div>
	</section>
