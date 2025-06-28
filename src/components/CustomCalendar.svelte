<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import CustomDropdown from './CustomDropdown.svelte';

	export let selectedDate: Date | null = null;

	const dispatch = createEventDispatcher<{ select: Date }>();

	let selectedYear = new Date().getFullYear();
	let selectedMonth = new Date().getMonth();
	let selectedDay: number | null = null;

	$: if (selectedDate) {
		selectedYear = selectedDate.getFullYear();
		selectedMonth = selectedDate.getMonth();
		selectedDay = selectedDate.getDate();
	}

	const months = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

	$: daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
	$: firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

	$: {
		selectedYear;
		selectedMonth;
		selectedDay = null;
	}

	function selectDate(day: number) {
		selectedDay = day;
		const date = new Date(selectedYear, selectedMonth, day);
		dispatch('select', date);
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
</script>

<div class="w-full max-w-sm mx-auto bg-neutral-800 rounded-lg border border-neutral-600 p-3 sm:p-4 shadow-xl">
	<div class="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mb-4">
		<div class="w-full sm:w-20">
			<CustomDropdown
				value={selectedYear}
				options={years}
				on:change={(e) => {
					selectedYear = e.detail;
				}}
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

	<div class="grid grid-cols-7 gap-1 sm:gap-1">
		{#each ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as day}
			<div class="text-center text-xs sm:text-xs text-neutral-400 py-2 font-medium">
				{day}
			</div>
		{/each}

		<!-- Empty cells for days before month starts -->
		{#each Array(firstDayOfMonth) as _, i}
			{@const prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1}
			{@const prevYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear}
			{@const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate()}
			{@const day = daysInPrevMonth - firstDayOfMonth + i + 1}
			<div class="h-8 sm:h-8 flex items-center justify-center text-neutral-500 bg-neutral-800 opacity-60 select-none">
				{day}
			</div>
		{/each}

		{#each Array(daysInMonth) as _, i}
			{@const day = i + 1}
			<button
				on:click={() => selectDate(day)}
				class="h-8 w-8 sm:h-8 sm:w-8 text-xs sm:text-sm rounded transition-all duration-200 flex items-center justify-center touch-manipulation
					{selectedDay === day 
						? 'bg-white text-neutral-900 font-medium' 
						: isToday(day)
						? 'bg-neutral-600 text-white'
						: 'text-neutral-200 hover:bg-neutral-700'
					}"
			>
				{day}
			</button>
		{/each}
	</div>
</div>
