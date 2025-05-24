<script lang="ts">
	export let monthsLived: number = 0;
	export let selectedMonthIndex: number | null = null;
	export let handleClick: (monthIndex: number) => void;

	const monthsPerRow: number = 36;
	const rows: number = 30;
</script>

<div class="flex flex-col gap-[2px]">
	{#each Array(rows) as _, rowIndex}
		<div class="flex gap-[2px]">
			{#each Array(monthsPerRow) as _, colIndex}
				{@const monthIndex = rowIndex * monthsPerRow + colIndex}
				<!-- svelte-ignore a11y-no-noninteractive-tabindex a11y-no-static-element-interactions -->
				<div
					class={`h-1 w-1 cursor-pointer rounded-full transition-all duration-300 sm:h-2 sm:w-2 md:h-3 md:w-3 lg:hover:scale-110 ${monthIndex >= monthsLived ? 'hover:bg-blue-700' : 'hover:bg-red-800'}`}
					class:bg-red-500={monthIndex < monthsLived}
					class:bg-blue-500={monthIndex >= monthsLived}
					class:bg-red-800={selectedMonthIndex === monthIndex && monthIndex < monthsLived}
					class:bg-blue-700={selectedMonthIndex === monthIndex && monthIndex >= monthsLived}
					on:click={() => handleClick(monthIndex)}
					on:keydown={() => handleClick(monthIndex)}
					aria-label="Month Index"
					tabindex={1}
				></div>
			{/each}
		</div>
	{/each}
</div>
