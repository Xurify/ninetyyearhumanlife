<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let selectedDate: Date | null = null;
	export let isMobileModal = false;

	const dispatch = createEventDispatcher<{
		select: Date;
		close: void;
	}>();

	const today = new Date();
	const currentYear = today.getFullYear();
	const currentMonth = today.getMonth();
	const currentDay = today.getDate();

	let activeView: 'days' | 'months' | 'years' = 'days';

	let viewingYear = selectedDate ? selectedDate.getFullYear() : currentYear - 25;
	let viewingMonth = selectedDate ? selectedDate.getMonth() : 0;

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const shortMonths = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

	const minimumYear = currentYear - 110;
	const yearsList = Array.from({ length: currentYear - minimumYear + 1 }, function (_, yearOffset) {
		return currentYear - yearOffset;
	});

	$: daysInMonth = new Date(viewingYear, viewingMonth + 1, 0).getDate();
	$: firstDayOfWeek = new Date(viewingYear, viewingMonth, 1).getDay();

	$: emptyLeadingDays = Array.from({ length: firstDayOfWeek }, function (_, offset) {
		const previousMonth = viewingMonth === 0 ? 11 : viewingMonth - 1;
		const previousYear = viewingMonth === 0 ? viewingYear - 1 : viewingYear;
		const daysInPreviousMonth = new Date(previousYear, previousMonth + 1, 0).getDate();
		return daysInPreviousMonth - firstDayOfWeek + offset + 1;
	});

	$: monthDaysList = Array.from({ length: daysInMonth }, function (_, offset) {
		return offset + 1;
	});

	function isFutureDate(day: number): boolean {
		if (viewingYear > currentYear) return true;
		if (viewingYear === currentYear && viewingMonth > currentMonth) return true;
		if (viewingYear === currentYear && viewingMonth === currentMonth && day > currentDay) {
			return true;
		}
		return false;
	}

	function isSelectedDate(day: number): boolean {
		if (!selectedDate) return false;
		return (
			selectedDate.getFullYear() === viewingYear &&
			selectedDate.getMonth() === viewingMonth &&
			selectedDate.getDate() === day
		);
	}

	function isToday(day: number): boolean {
		return viewingYear === currentYear && viewingMonth === currentMonth && day === currentDay;
	}

	function handleDayClick(day: number) {
		if (isFutureDate(day)) return;
		const date = new Date(viewingYear, viewingMonth, day);
		dispatch('select', date);
	}

	function handleMonthSelect(monthIndex: number) {
		if (viewingYear === currentYear && monthIndex > currentMonth) {
			return;
		}
		viewingMonth = monthIndex;
		activeView = 'days';
	}

	function handleYearSelect(year: number) {
		viewingYear = year;
		if (viewingYear === currentYear && viewingMonth > currentMonth) {
			viewingMonth = currentMonth;
		}
		activeView = 'months';
	}

	function previousMonth() {
		if (viewingMonth === 0) {
			viewingMonth = 11;
			viewingYear -= 1;
		} else {
			viewingMonth -= 1;
		}
	}

	function nextMonth() {
		if (
			viewingYear > currentYear ||
			(viewingYear === currentYear && viewingMonth >= currentMonth)
		) {
			return;
		}
		if (viewingMonth === 11) {
			viewingMonth = 0;
			viewingYear += 1;
		} else {
			viewingMonth += 1;
		}
	}

	function handleClose() {
		dispatch('close');
	}
</script>

<div
	class="mx-auto w-full max-w-sm rounded-2xl border border-neutral-700/80 bg-neutral-900 p-4 shadow-2xl backdrop-blur-xl select-none sm:p-5"
>
	<div class="mb-3 flex items-center justify-between border-b border-neutral-800 pb-3">
		<div class="flex items-center gap-1.5">
			<button
				type="button"
				on:click={() => (activeView = activeView === 'months' ? 'days' : 'months')}
				class="rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors {activeView ===
				'months'
					? 'bg-neutral-800 text-white shadow-sm'
					: 'text-neutral-200 hover:bg-neutral-800/70 hover:text-white'}"
				aria-label="Toggle month selector"
			>
				{months[viewingMonth]}
			</button>

			<button
				type="button"
				on:click={() => (activeView = activeView === 'years' ? 'days' : 'years')}
				class="rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors {activeView ===
				'years'
					? 'bg-neutral-800 text-white shadow-sm'
					: 'text-neutral-200 hover:bg-neutral-800/70 hover:text-white'}"
				aria-label="Toggle year selector"
			>
				{viewingYear}
			</button>
		</div>

		<div class="flex items-center gap-1">
			{#if activeView === 'days'}
				<button
					type="button"
					on:click={previousMonth}
					class="touch-manipulation rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-100"
					aria-label="Previous month"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>

				<button
					type="button"
					on:click={nextMonth}
					disabled={viewingYear >= currentYear && viewingMonth >= currentMonth}
					class="touch-manipulation rounded-lg p-2 transition-colors {viewingYear >= currentYear &&
					viewingMonth >= currentMonth
						? 'cursor-not-allowed text-neutral-600'
						: 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100'}"
					aria-label="Next month"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			{:else}
				<button
					type="button"
					on:click={() => (activeView = 'days')}
					class="rounded-md bg-neutral-800/80 px-2 py-1 text-xs text-neutral-400 transition-colors hover:text-white"
				>
					Calendar
				</button>
			{/if}

			{#if isMobileModal}
				<button
					type="button"
					on:click={handleClose}
					class="ml-1 touch-manipulation rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-100"
					aria-label="Close calendar"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			{/if}
		</div>
	</div>

	{#if activeView === 'days'}
		<div class="mb-1 grid grid-cols-7 gap-1">
			{#each dayLabels as dayLabel}
				<div class="flex h-8 items-center justify-center text-xs font-medium text-neutral-400">
					{dayLabel}
				</div>
			{/each}
		</div>

		<div class="grid grid-cols-7 gap-1">
			{#each emptyLeadingDays as leadingDay}
				<div
					class="flex h-10 items-center justify-center text-xs text-neutral-600 select-none sm:h-9"
				>
					{leadingDay}
				</div>
			{/each}

			{#each monthDaysList as day}
				{@const future = isFutureDate(day)}
				{@const selected = isSelectedDate(day)}
				{@const current = isToday(day)}
				<button
					type="button"
					on:click={() => handleDayClick(day)}
					disabled={future}
					class="flex h-10 touch-manipulation items-center justify-center rounded-xl text-sm font-medium transition-all duration-150 sm:h-9 {selected
						? 'scale-105 bg-neutral-100 font-semibold text-neutral-900 shadow-md'
						: future
							? 'cursor-not-allowed text-neutral-700'
							: current
								? 'bg-neutral-800 text-white ring-1 ring-neutral-500 hover:bg-neutral-700'
								: 'text-neutral-200 hover:bg-neutral-800 hover:text-white active:scale-95'}"
				>
					{day}
				</button>
			{/each}
		</div>
	{:else if activeView === 'months'}
		<div class="grid grid-cols-3 gap-2 py-2">
			{#each shortMonths as shortMonthName, monthIndex}
				{@const disabled = viewingYear === currentYear && monthIndex > currentMonth}
				{@const isCurrentMonth = viewingMonth === monthIndex}
				<button
					type="button"
					on:click={() => handleMonthSelect(monthIndex)}
					{disabled}
					class="touch-manipulation rounded-xl px-2 py-3 text-sm font-medium transition-all duration-150 {isCurrentMonth
						? 'bg-neutral-100 font-semibold text-neutral-900 shadow-md'
						: disabled
							? 'cursor-not-allowed text-neutral-700'
							: 'bg-neutral-800/50 text-neutral-200 hover:bg-neutral-800 hover:text-white active:scale-95'}"
				>
					{shortMonthName}
				</button>
			{/each}
		</div>
	{:else if activeView === 'years'}
		<div class="grid max-h-64 grid-cols-4 gap-2 overflow-y-auto py-1 pr-1">
			{#each yearsList as year}
				{@const isCurrentYear = viewingYear === year}
				<button
					type="button"
					on:click={() => handleYearSelect(year)}
					class="touch-manipulation rounded-xl px-1 py-2.5 text-xs font-medium transition-all duration-150 sm:text-sm {isCurrentYear
						? 'bg-neutral-100 font-semibold text-neutral-900 shadow-md'
						: 'bg-neutral-800/50 text-neutral-200 hover:bg-neutral-800 hover:text-white active:scale-95'}"
				>
					{year}
				</button>
			{/each}
		</div>
	{/if}
</div>
