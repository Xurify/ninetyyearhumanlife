<script lang="ts">
	import type { Reference } from '../lib/timePerceptionData';

	export let references: Reference[] = [];
	export let showAll: boolean = false;

	$: displayReferences = showAll ? references : references.slice(0, 3);
	$: hasMore = references.length > 3;

	function formatReference(ref: Reference): string {
		let citation = `${ref.authors} (${ref.year}). ${ref.title}. `;

		if (ref.journal.includes('Press') || ref.journal.includes('University')) {
			citation += ref.journal;
		} else {
			citation += `<em>${ref.journal}</em>`;
		}

		return citation;
	}

	function toggleShowAll() {
		showAll = !showAll;
	}
</script>

{#if references.length > 0}
	<div class="rounded-md bg-gray-500/10 border border-gray-500/20 p-3">
		<h4 class="mb-2 text-sm font-semibold text-gray-400">Sources:</h4>
		<div class="space-y-2">
			{#each displayReferences as ref}
				<div class="text-xs text-gray-400">
					<span class="text-gray-300">{@html formatReference(ref)}</span>
					<div class="mt-1 flex flex-wrap gap-3">
						{#if ref.doi}
							<a
								href="https://doi.org/{ref.doi}"
								target="_blank"
								rel="noopener noreferrer"
								class="text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
							>
								<span>🔗</span>
								<span>DOI: {ref.doi}</span>
							</a>
						{/if}
						{#if ref.url}
							<a
								href={ref.url}
								target="_blank"
								rel="noopener noreferrer"
								class="text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
							>
								<span>📄</span>
								<span>View Source</span>
							</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		{#if hasMore}
			<button
				on:click={toggleShowAll}
				class="mt-2 text-xs text-blue-400 hover:text-blue-300 underline"
			>
				{showAll ? 'Show Less' : `Show ${references.length - 3} More Sources`}
			</button>
		{/if}
	</div>
{/if}
