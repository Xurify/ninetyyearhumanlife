<script lang="ts">
	import { references } from '../lib/timePerceptionData';
	import type { Reference } from '../lib/timePerceptionData';

	let showReferences = false;

	function formatReference(ref: Reference): string {
		let citation = `${ref.authors} (${ref.year}). ${ref.title}. `;

		if (ref.journal.includes('Press') || ref.journal.includes('University')) {
			citation += ref.journal;
		} else {
			citation += `<em>${ref.journal}</em>`;
		}

		return citation;
	}

	function toggleReferences() {
		showReferences = !showReferences;
	}
</script>

<div class="rounded-lg border border-white/20 bg-[#141612] p-6">
	<div class="flex items-center justify-between">
		<h3 class="text-lg font-semibold text-white">📚 Scientific References</h3>
		<button
			on:click={toggleReferences}
			class="text-sm text-blue-400 hover:text-blue-300 underline"
		>
			{showReferences ? 'Hide References' : 'Show All References'}
		</button>
	</div>

	{#if showReferences}
		<div class="flex flex-col gap-4 text-sm text-gray-300">
			<p class="text-gray-400">
				The time perception information presented is based on peer-reviewed research in psychology,
				neuroscience, and cognitive science. Below are the primary sources used:
			</p>

			<div class="flex flex-col gap-3">
				{#each references as ref}
					<div class="border-l-2 border-gray-600 pl-4">
						<div class="text-gray-300">
							{@html formatReference(ref)}
						</div>
						<div class="flex flex-wrap gap-3">
							{#if ref.doi}
								<a
									href="https://doi.org/{ref.doi}"
									target="_blank"
									rel="noopener noreferrer"
									class="text-xs text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
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
									class="text-xs text-blue-400 hover:text-blue-300 underline flex items-center gap-1"
								>
									<span>📄</span>
									<span>View Source</span>
								</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>

			<div class="rounded-md bg-blue-500/10 border border-blue-500/20 p-3">
				<div class="flex flex-col gap-2">
					<h4 class="text-sm font-semibold text-blue-400">Key Research Areas:</h4>
					<ul class="flex flex-col gap-1 text-xs text-gray-300">
						<li class="flex items-start gap-2">
							<span class="text-blue-400">•</span>
							<span><strong>Developmental Psychology:</strong> How time perception develops from childhood to adulthood</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-blue-400">•</span>
							<span><strong>Cognitive Neuroscience:</strong> Brain mechanisms underlying time perception</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-blue-400">•</span>
							<span><strong>Aging Research:</strong> How time perception changes with age and experience</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-blue-400">•</span>
							<span><strong>Memory Studies:</strong> The relationship between memory formation and time perception</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	{:else}
		<p class="text-sm text-gray-400">
			All time perception information is backed by scientific research.
			Click "Show All References" to view the complete bibliography of sources used.
		</p>
	{/if}
</div>
