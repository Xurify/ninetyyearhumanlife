<script lang="ts">
	import type { LifeData } from '../lib/weekCalculations';

	interface Props {
		lifeData: LifeData;
	}

	let { lifeData }: Props = $props();

	const monthsPerRow = 36;
	const totalRows = 30;
	const gridTotalMonths = totalRows * monthsPerRow;

	const rowIndices = Array.from({ length: totalRows }, function (_, index) {
		return index;
	});
	const monthInRowIndices = Array.from({ length: monthsPerRow }, function (_, index) {
		return index;
	});

	function getMonthStatus(monthIndex: number): 'lived' | 'current' | 'future' {
		if (monthIndex < lifeData.monthsLived - 1) return 'lived';
		if (monthIndex === lifeData.monthsLived - 1) return 'current';
		return 'future';
	}

	function getMonthClasses(monthIndex: number): string {
		const status = getMonthStatus(monthIndex);
		const baseClasses = 'w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 transition-all duration-300';

		switch (status) {
			case 'lived':
				return `${baseClasses} bg-neutral-600 hover:bg-neutral-500`;
			case 'current':
				return `${baseClasses} bg-white animate-pulse`;
			case 'future':
				return `${baseClasses} bg-neutral-800 hover:bg-neutral-700`;
			default:
				return baseClasses;
		}
	}
</script>

<div class="w-full max-w-4xl">
	<div class="space-y-4">
		<div class="space-y-2 text-center">
			<h2 class="px-4 text-center text-lg font-light text-neutral-200 sm:text-xl">
				Each square represents one month of life
			</h2>
			<div
				class="flex flex-col items-center justify-center gap-3 text-xs text-neutral-400 sm:flex-row sm:gap-6 md:text-sm"
			>
				<div class="flex items-center gap-2">
					<div class="h-2.5 w-2.5 bg-neutral-600 sm:h-3 sm:w-3"></div>
					<span>Months lived</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="h-2.5 w-2.5 bg-white sm:h-3 sm:w-3"></div>
					<span>Current month</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="h-2.5 w-2.5 bg-neutral-800 sm:h-3 sm:w-3"></div>
					<span>Months remaining</span>
				</div>
			</div>
		</div>

		<div class="overflow-x-auto">
			<div class="mx-auto grid w-fit min-w-max grid-cols-36 gap-0.5">
				{#each rowIndices as rowIndex}
					{#each monthInRowIndices as monthInRow}
						{@const monthIndex = rowIndex * monthsPerRow + monthInRow}
						<div
							class={getMonthClasses(monthIndex)}
							title={`Row ${rowIndex + 1}, Month ${monthIndex + 1}`}
						></div>
					{/each}
				{/each}
			</div>
		</div>

		<div class="text-center">
			<p class="text-sm text-neutral-500">
				{lifeData.monthsLived.toLocaleString()} months lived • {lifeData.monthsRemaining.toLocaleString()}
				months remaining
			</p>
			<p class="mt-1 text-xs text-neutral-600">
				Grid shows {gridTotalMonths.toLocaleString()} months (90 years of life)
			</p>
		</div>
	</div>
</div>
