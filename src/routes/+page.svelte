<script lang="ts">
	import Slider from '../components/Slider.svelte';
	import Modal from '../components/Modal.svelte';

	let age: number = 20;
	const totalMonths: number = 1080;
	const monthsPerRow: number = 36;
	const rows: number = 30;

	$: monthsLived = age * 12;
	let selectedMonthIndex: number | null = null;
	$: selectedMonthIndex = selectedMonthIndex;

	const isProduction = import.meta.env.PROD;
	let showModal = isProduction;

	const handleClick = (monthIndex: number) => {
		if (monthIndex === selectedMonthIndex) {
			selectedMonthIndex = null;
			return;
		}
		selectedMonthIndex = monthIndex;
	};
</script>

<div class="mx-auto flex max-w-6xl flex-col items-center p-4">
	<h1 class="mb-4 text-center text-2xl font-bold">A 90-Year Human Life in Months</h1>

	<div class="mb-6 w-full max-w-md rounded-lg border border-white/20 bg-[#141612] p-4">
		<Slider label="Age" bind:value={age} name="age" min={0} max={90} />
	</div>

	<div class="mb-6 w-full max-w-md rounded-lg border border-white/20 bg-[#141612] p-4">
		<span>Selected Month: </span>
		<b>
			{#if selectedMonthIndex}
				{selectedMonthIndex + 1}
			{:else}
				None
			{/if}
		</b>
	</div>

	<div class="mb-4 flex flex-col gap-[2px]">
		{#each Array(rows) as _, rowIndex}
			<div class="flex gap-[2px]">
				{#each Array(monthsPerRow) as _, colIndex}
					{@const monthIndex = rowIndex * monthsPerRow + colIndex}
					<!-- svelte-ignore a11y-no-noninteractive-tabindex a11y-no-static-element-interactions -->
					<div
						class={`h-1 w-1 cursor-pointer rounded-full transition-all duration-300 sm:h-2 sm:w-2 md:h-3 md:w-3 ${monthIndex >= monthsLived ? 'hover:bg-blue-700' : 'hover:bg-red-800'}`}
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

	<div class="mt-4 text-center text-sm">
		<p class="text-orange-500">Each row is 36 months = 3 years</p>
		<p>Months lived: {monthsLived}</p>
		<p>Months remaining: {totalMonths - monthsLived}</p>
	</div>

	<Modal bind:show={showModal} />
</div>
