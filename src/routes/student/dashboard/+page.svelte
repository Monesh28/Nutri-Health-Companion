<script>
	import { authState } from '$lib/auth.svelte.js';
	import { subscribeTasksForUser, taskStatuses, updateTaskStatus } from '$lib/firebase-data';

	let tasks = $state([]);

	let counts = $derived({
		todo: tasks.filter((task) => task.status === 'todo').length,
		doing: tasks.filter((task) => task.status === 'doing').length,
		done: tasks.filter((task) => task.status === 'done').length
	});

	$effect(() => {
		if (!authState.profile?.id) {
			return;
		}

		return subscribeTasksForUser(authState.profile.id, (items) => {
			tasks = items;
		});
	});

	async function changeStatus(task, status) {
		await updateTaskStatus(task.id, status);
	}
</script>

<section class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
		<div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<p class="text-sm font-semibold uppercase tracking-wide text-emerald-700">Student</p>
				<h1 class="mt-2 text-3xl font-bold text-slate-950">Task Dashboard</h1>
			</div>
			<p class="text-sm text-slate-500">{tasks.length} assigned task{tasks.length === 1 ? '' : 's'}</p>
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

		<div class="mt-6 grid gap-4">
			{#each tasks as task (task.id)}
				<article class="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
					<div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
						<div>
							<div class="flex flex-wrap items-center gap-2">
								<h2 class="text-xl font-semibold text-slate-950">{task.title}</h2>
								<span class="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold uppercase text-slate-600">
									{task.status}
								</span>
							</div>
							<p class="mt-2 whitespace-pre-line text-slate-600">{task.description}</p>
							<p class="mt-3 text-sm text-slate-500">Created {task.createdAtLabel}</p>
						</div>

						<div class="flex flex-wrap gap-2">
							{#each taskStatuses as status (status)}
								<button
									type="button"
									onclick={() => changeStatus(task, status)}
									disabled={task.status === status}
									class={[
										'rounded-md px-3 py-2 text-sm font-semibold capitalize transition disabled:cursor-not-allowed',
										task.status === status
											? 'bg-emerald-600 text-white'
											: 'border border-slate-300 text-slate-700 hover:bg-slate-50'
									]}
								>
									{status}
								</button>
							{/each}
						</div>
					</div>
				</article>
			{:else}
				<div class="rounded-md border border-dashed border-slate-300 bg-white p-10 text-center">
					<h2 class="text-xl font-semibold text-slate-950">No tasks yet</h2>
					<p class="mt-2 text-slate-600">Your admin has not assigned any tasks to you.</p>
				</div>
			{/each}
		</div>
	</section>
