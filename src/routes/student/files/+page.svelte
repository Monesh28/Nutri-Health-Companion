<script>
	import { subscribeFiles } from '$lib/firebase-data';
	import { onMount } from 'svelte';

	let files = $state([]);

	onMount(() => {
		return subscribeFiles((items) => {
			files = items;
		});
	});

	function formatBytes(bytes = 0) {
		if (bytes < 1024) {
			return `${bytes} B`;
		}

		if (bytes < 1024 * 1024) {
			return `${(bytes / 1024).toFixed(1)} KB`;
		}

		return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
	}
</script>

<section class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
		<div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<p class="text-sm font-semibold uppercase tracking-wide text-emerald-700">Student</p>
				<h1 class="mt-2 text-3xl font-bold text-slate-950">Shared Files</h1>
			</div>
			<p class="text-sm text-slate-500">{files.length} file{files.length === 1 ? '' : 's'}</p>
		</div>

		<div class="mt-6 grid gap-4 md:grid-cols-2">
			{#each files as file (file.id)}
				<article class="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
					<p class="text-lg font-semibold text-slate-950">{file.name}</p>
					<p class="mt-2 text-sm text-slate-500">
						{formatBytes(file.size)} - Uploaded {file.createdAtLabel}
					</p>
					<a
						href={file.url}
						target="_blank"
						rel="noreferrer"
						class="mt-4 inline-flex rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
					>
						Open file
					</a>
				</article>
			{:else}
				<div class="rounded-md border border-dashed border-slate-300 bg-white p-10 text-center md:col-span-2">
					<h2 class="text-xl font-semibold text-slate-950">No shared files</h2>
					<p class="mt-2 text-slate-600">Files uploaded by the admin will appear here.</p>
				</div>
			{/each}
		</div>
	</section>
