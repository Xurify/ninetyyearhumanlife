<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import CustomDropdown from './CustomDropdown.svelte';

	const dispatch = createEventDispatcher<{ select: Date }>();

	let selectedYear = new Date().getFullYear();
	let selectedMonth = new Date().getMonth();
	let selectedDay: number | null = null;

	const months = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

	$: daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
	$: firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

	function selectDate(day: number) {
		selectedDay = day;
		const date = new Date(selectedYear, selectedMonth, day);
		dispatch('select', date);
	}

	function handleYearChange() {
		selectedDay = null;
	}

	function previousMonth() {
		if (selectedMonth === 0) {
			selectedMonth = 11;
			selectedYear--;
		} else {
			selectedMonth--;
		}
		selectedDay = null;
	}

	function nextMonth() {
		if (selectedMonth === 11) {
			selectedMonth = 0;
			selectedYear++;
		} else {
			selectedMonth++;
		}
		selectedDay = null;
	}

	function isToday(day: number): boolean {
		const today = new Date();
		return selectedYear === today.getFullYear() && 
			   selectedMonth === today.getMonth() && 
			   day === today.getDate();
	}

	function isFutureDate(day: number): boolean {
		const today = new Date();
		const checkDate = new Date(selectedYear, selectedMonth, day);
		return checkDate > today;
	}
</script>

<div class="w-full max-w-sm mx-auto bg-neutral-800 rounded-lg border border-neutral-600 p-3 sm:p-4 shadow-xl">
	<!-- Year and Month Selectors -->
	<div class="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mb-4">
		<div class="w-full sm:w-20">
			<CustomDropdown
				bind:value={selectedYear}
				options={years}
				on:change={(e) => { selectedYear = e.detail; handleYearChange(); }}
				maxHeight="200px"
			/>
		</div>

		<div class="flex items-center gap-2">
			<button
				on:click={previousMonth}
				class="p-2 sm:p-1 hover:bg-neutral-700 rounded transition-colors touch-manipulation"
				aria-label="Previous month"
			>
				<svg class="w-5 h-5 sm:w-4 sm:h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			<span class="text-neutral-100 font-medium min-w-[100px] sm:min-w-[100px] text-center text-base sm:text-sm">
				{months[selectedMonth]}
			</span>

			<button
				on:click={nextMonth}
				class="p-2 sm:p-1 hover:bg-neutral-700 rounded transition-colors touch-manipulation"
				aria-label="Next month"
			>
				<svg class="w-5 h-5 sm:w-4 sm:h-4 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	</div>

	<!-- Calendar Grid -->
	<div class="grid grid-cols-7 gap-1 sm:gap-1">
		<!-- Day Headers -->
		{#each ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as day}
			<div class="text-center text-xs sm:text-xs text-neutral-400 py-2 font-medium">
				{day}
			</div>
		{/each}

		<!-- Empty cells for days before month starts -->
		{#each Array(firstDayOfMonth) as _}
			<div class="h-8 sm:h-8"></div>
		{/each}

		<!-- Days of the month -->
		{#each Array(daysInMonth) as _, i}
			{@const day = i + 1}
			<button
				on:click={() => selectDate(day)}
				disabled={isFutureDate(day)}
				class="h-8 w-8 sm:h-8 sm:w-8 text-xs sm:text-sm rounded transition-all duration-200 flex items-center justify-center touch-manipulation
					{selectedDay === day 
						? 'bg-white text-neutral-900 font-medium' 
						: isToday(day)
						? 'bg-neutral-600 text-white'
						: isFutureDate(day)
						? 'text-neutral-500 cursor-not-allowed'
						: 'text-neutral-200 hover:bg-neutral-700'
					}"
			>
				{day}
			</button>
		{/each}
	</div>

	{#if selectedDay}
		<div class="mt-4 text-center text-sm text-neutral-400">
			Selected: {months[selectedMonth]} {selectedDay}, {selectedYear}
		</div>
	{/if}
</div>
