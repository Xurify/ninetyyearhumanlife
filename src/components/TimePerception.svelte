<script lang="ts">
	import type { TimePerceptionData } from '../lib/timePerceptionData';
	import { getReferencesForData } from '../lib/timePerceptionData';
	import References from './References.svelte';

	export let timePerceptionData: TimePerceptionData | null = null;
	export let currentAge: number = 20;
	export let selectedMonth: number | null = null;

	$: selectedAge = selectedMonth !== null ? Math.floor(selectedMonth / 12) : currentAge;
	$: displayData = timePerceptionData;
	$: currentReferences = displayData ? getReferencesForData(displayData) : [];

	function getTimeIntensity(ageRange: string): number {
		const intensityMap: { [key: string]: number } = {
			"0-5 years": 1,
			"6-12 years": 2,
			"13-18 years": 3,
			"19-25 years": 4,
			"26-35 years": 5,
			"36-45 years": 6,
			"46-55 years": 7,
			"56-65 years": 8,
			"66-75 years": 6,
			"76-90 years": 4
		};
		return intensityMap[ageRange] || 5;
	}

	$: timeIntensity = displayData ? getTimeIntensity(displayData.ageRange) : 5;
</script>

{#if displayData}
	<div class="w-full rounded-lg border border-white/20 bg-[#141612] p-6">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="text-xl font-bold text-white">Time Perception</h2>
			<div class="flex items-center gap-3">
				<div class="text-sm text-gray-400">
					{#if selectedMonth !== null}
						Month {selectedMonth + 1} (Age {selectedAge})
					{:else}
						Age {currentAge}
					{/if}
				</div>
				<!-- Time Speed Indicator -->
				<div class="flex items-center gap-1">
					<span class="text-xs text-gray-500">Speed:</span>
					<div class="flex gap-1">
						{#each Array(8) as _, i}
							<div
								class="h-2 w-1 rounded-full transition-colors"
								class:bg-red-500={i < timeIntensity && timeIntensity <= 4}
								class:bg-yellow-500={i < timeIntensity && timeIntensity > 4 && timeIntensity <= 6}
								class:bg-orange-500={i < timeIntensity && timeIntensity > 6}
								class:bg-gray-600={i >= timeIntensity}
							></div>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="space-y-4">
			<!-- Age Range and Time Feeling -->
			<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
				<div class="text-lg font-semibold text-blue-400">{displayData.ageRange}</div>
				<div class="text-lg font-bold text-orange-400">"{displayData.timeFeeling}"</div>
			</div>

			<!-- Description -->
			<div class="text-gray-300">
				<p>{displayData.description}</p>
			</div>

			<!-- Psychological Factors -->
			<div>
				<h3 class="mb-2 text-sm font-semibold text-yellow-400">Psychological Factors:</h3>
				<ul class="space-y-1 text-sm text-gray-300">
					{#each displayData.psychologicalFactors as factor}
						<li class="flex items-start">
							<span class="mr-2 text-yellow-400">•</span>
							<span>{factor}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Examples -->
			<div>
				<h3 class="mb-2 text-sm font-semibold text-green-400">Common Experiences:</h3>
				<ul class="space-y-1 text-sm text-gray-300">
					{#each displayData.examples as example}
						<li class="flex items-start">
							<span class="mr-2 text-green-400">•</span>
							<span>{example}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Scientific Basis -->
			<div class="rounded-md bg-white/5 p-3">
				<h3 class="mb-2 text-sm font-semibold text-purple-400">Scientific Basis:</h3>
				<p class="text-sm text-gray-300">{displayData.scientificBasis}</p>
			</div>

			<!-- References -->
			<References references={currentReferences} />

			<!-- Tips -->
			<div class="rounded-md bg-blue-500/10 border border-blue-500/20 p-3">
				<h3 class="mb-2 text-sm font-semibold text-blue-400">💡 Tips to Slow Down Time:</h3>
				<ul class="space-y-1 text-sm text-gray-300">
					<li class="flex items-start">
						<span class="mr-2 text-blue-400">•</span>
						<span>Try new experiences and break routines</span>
					</li>
					<li class="flex items-start">
						<span class="mr-2 text-blue-400">•</span>
						<span>Practice mindfulness and present-moment awareness</span>
					</li>
					<li class="flex items-start">
						<span class="mr-2 text-blue-400">•</span>
						<span>Create memorable moments and experiences</span>
					</li>
					<li class="flex items-start">
						<span class="mr-2 text-blue-400">•</span>
						<span>Learn new skills or hobbies</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
{:else}
	<div class="w-full rounded-lg border border-white/20 bg-[#141612] p-6">
		<div class="text-center text-gray-400">
			<h2 class="mb-2 text-xl font-bold text-white">Time Perception</h2>
			<p>Select a month or adjust your age to see how time perception changes throughout life.</p>
		</div>
	</div>
{/if}
