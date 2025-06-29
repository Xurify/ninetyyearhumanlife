<script lang="ts">
	import type { LifeData } from '../lib/weekCalculations';

	export let lifeData: LifeData;

	// 36 months per row, 30 rows = 1080 months (90 years)
	// Display as 36 columns (months per row) x 30 rows - shows full 90-year lifespan
	const monthsPerRow = 36;
	const totalRows = 30;
	const gridTotalMonths = totalRows * monthsPerRow; // 1080 months shown in grid

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
		<div class="text-center space-y-2">
			<h2 class="text-lg sm:text-xl font-light text-neutral-200 px-4 text-center">
				Each square represents one month of life
			</h2>
			<div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs md:text-sm text-neutral-400">
				<div class="flex items-center gap-2">
					<div class="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-neutral-600"></div>
					<span>Months lived</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white"></div>
					<span>Current month</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-neutral-800"></div>
					<span>Months remaining</span>
				</div>
			</div>
		</div>

		<div class="overflow-x-auto">
			<div class="grid grid-cols-36 gap-0.5 min-w-max mx-auto" style="width: fit-content;">
				{#each Array(totalRows) as _, rowIndex}
					{#each Array(monthsPerRow) as _, monthInRow}
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
				{lifeData.monthsLived.toLocaleString()} months lived • {lifeData.monthsRemaining.toLocaleString()} months remaining
			</p>
			<p class="text-xs text-neutral-600 mt-1">
				Grid shows {gridTotalMonths.toLocaleString()} months (90 years of life)
			</p>
		</div>
	</div>
</div>
