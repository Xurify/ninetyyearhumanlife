<script lang="ts">
	import { onMount } from 'svelte';
	import CustomCalendar from './CustomCalendar.svelte';

	interface Props {
		selectedDate?: Date | null;
		onselect?: (date: Date) => void;
		onsubmit?: (date: Date) => void;
	}

	let { selectedDate = $bindable(null), onselect, onsubmit }: Props = $props();

	let showCalendar = $state(false);

	let monthInput = $state('');
	let dayInput = $state('');
	let yearInput = $state('');

	let monthInputElement = $state<HTMLInputElement>();
	let dayInputElement = $state<HTMLInputElement>();
	let yearInputElement = $state<HTMLInputElement>();

	const today = new Date();
	const currentYear = today.getFullYear();

	$effect(() => {
		if (selectedDate) {
			const formattedMonth = String(selectedDate.getMonth() + 1).padStart(2, '0');
			const formattedDay = String(selectedDate.getDate()).padStart(2, '0');
			const formattedYear = String(selectedDate.getFullYear());

			if (monthInput !== formattedMonth) monthInput = formattedMonth;
			if (dayInput !== formattedDay) dayInput = formattedDay;
			if (yearInput !== formattedYear) yearInput = formattedYear;
		}
	});

	let isValid = $derived(validateDate(monthInput, dayInput, yearInput));

	function validateDate(monthString: string, dayString: string, yearString: string): boolean {
		const monthNumber = Number(monthString);
		const dayNumber = Number(dayString);
		const yearNumber = Number(yearString);

		if (
			!monthString ||
			!dayString ||
			!yearString ||
			isNaN(monthNumber) ||
			isNaN(dayNumber) ||
			isNaN(yearNumber)
		) {
			return false;
		}

		if (yearString.length !== 4 || yearNumber < currentYear - 110 || yearNumber > currentYear) {
			return false;
		}

		if (monthNumber < 1 || monthNumber > 12) {
			return false;
		}

		const daysInMonth = new Date(yearNumber, monthNumber, 0).getDate();
		if (dayNumber < 1 || dayNumber > daysInMonth) {
			return false;
		}

		const candidateDate = new Date(yearNumber, monthNumber - 1, dayNumber);
		if (candidateDate > today) {
			return false;
		}

		return true;
	}

	function syncDateFromInputs(): void {
		if (validateDate(monthInput, dayInput, yearInput)) {
			const candidateDate = new Date(Number(yearInput), Number(monthInput) - 1, Number(dayInput));
			selectedDate = candidateDate;
			onselect?.(candidateDate);
		}
	}

	function handleMonthInput(event: Event): void {
		const target = event.target as HTMLInputElement;
		let value = target.value.replace(/\D/g, '');

		if (value.length > 2) {
			value = value.slice(0, 2);
		}

		monthInput = value;
		target.value = value;

		if (value.length === 2 || (Number(value) > 1 && value.length === 1)) {
			if (value.length === 1) {
				monthInput = value.padStart(2, '0');
				target.value = monthInput;
			}
			dayInputElement?.focus();
			dayInputElement?.select();
		}

		syncDateFromInputs();
	}

	function handleDayInput(event: Event): void {
		const target = event.target as HTMLInputElement;
		let value = target.value.replace(/\D/g, '');

		if (value.length > 2) {
			value = value.slice(0, 2);
		}

		dayInput = value;
		target.value = value;

		if (value.length === 2 || (Number(value) > 3 && value.length === 1)) {
			if (value.length === 1) {
				dayInput = value.padStart(2, '0');
				target.value = dayInput;
			}
			yearInputElement?.focus();
			yearInputElement?.select();
		}

		syncDateFromInputs();
	}

	function handleYearInput(event: Event): void {
		const target = event.target as HTMLInputElement;
		let value = target.value.replace(/\D/g, '');

		if (value.length > 4) {
			value = value.slice(0, 4);
		}

		yearInput = value;
		target.value = value;

		syncDateFromInputs();
	}

	function handleDayKeydown(event: KeyboardEvent): void {
		if (event.key === 'Backspace' && !dayInput) {
			monthInputElement?.focus();
		} else if (event.key === 'ArrowLeft' && dayInputElement?.selectionStart === 0) {
			monthInputElement?.focus();
		}
	}

	function handleYearKeydown(event: KeyboardEvent): void {
		if (event.key === 'Backspace' && !yearInput) {
			dayInputElement?.focus();
		} else if (event.key === 'ArrowLeft' && yearInputElement?.selectionStart === 0) {
			dayInputElement?.focus();
		}
	}

	function handleMonthKeydown(event: KeyboardEvent): void {
		if (event.key === 'ArrowRight' && monthInputElement?.selectionStart === monthInput.length) {
			dayInputElement?.focus();
		}
	}

	function handlePaste(event: ClipboardEvent): void {
		const pasteData = event.clipboardData?.getData('text');
		if (!pasteData) return;

		const numbers = pasteData.match(/\d+/g);
		if (numbers && numbers.length >= 3) {
			event.preventDefault();
			if (numbers[0].length === 4) {
				yearInput = numbers[0];
				monthInput = numbers[1].padStart(2, '0');
				dayInput = numbers[2].padStart(2, '0');
			} else {
				monthInput = numbers[0].padStart(2, '0');
				dayInput = numbers[1].padStart(2, '0');
				yearInput = numbers[2];
			}
			syncDateFromInputs();
		}
	}

	function handleCalendarSelect(chosenDate: Date): void {
		selectedDate = chosenDate;
		monthInput = String(chosenDate.getMonth() + 1).padStart(2, '0');
		dayInput = String(chosenDate.getDate()).padStart(2, '0');
		yearInput = String(chosenDate.getFullYear());

		onselect?.(chosenDate);
		showCalendar = false;
	}

	function toggleCalendar(): void {
		showCalendar = !showCalendar;
	}

	function closeCalendar(): void {
		showCalendar = false;
	}

	function handleSubmit(): void {
		if (validateDate(monthInput, dayInput, yearInput)) {
			const candidateDate =
				selectedDate || new Date(Number(yearInput), Number(monthInput) - 1, Number(dayInput));
			selectedDate = candidateDate;
			if (document.activeElement instanceof HTMLElement) {
				document.activeElement.blur();
			}
			window.scrollTo(0, 0);
			onsubmit?.(candidateDate);
		}
	}

	function handleBoxClick(event: MouseEvent): void {
		const target = event.target as HTMLElement;
		if (target.closest('button')) return;

		if (typeof window !== 'undefined' && window.innerWidth < 768) {
			showCalendar = true;
		}
	}

	function handleClickOutside(event: MouseEvent): void {
		const target = event.target as Element;
		if (
			showCalendar &&
			!target.closest('.calendar-picker-container') &&
			!target.closest('.mobile-calendar-drawer')
		) {
			closeCalendar();
		}
	}

	onMount(() => {
		function handleGlobalKeydown(event: KeyboardEvent): void {
			if (event.key === 'Escape' && showCalendar) {
				closeCalendar();
			}
		}
		window.addEventListener('keydown', handleGlobalKeydown);
		window.addEventListener('click', handleClickOutside);
		return () => {
			window.removeEventListener('keydown', handleGlobalKeydown);
			window.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="flex min-h-dvh flex-col items-center justify-center px-4 py-8">
	<div class="w-full max-w-md space-y-8 text-center">
		<div class="space-y-4">
			<div class="flex justify-center">
				<img
					src="/icon.svg"
					alt="App Icon"
					class="h-20 w-20"
					width={150}
					height={150}
					loading="eager"
				/>
			</div>
			<h1 class="text-3xl font-light tracking-wide text-neutral-100 sm:text-4xl">
				Ninety Year Human Life
			</h1>
			<p class="text-base leading-relaxed font-light text-neutral-400 sm:text-lg">
				A simple visualization to help you reflect on the time you have
			</p>
		</div>

		<div class="space-y-6 pt-4 sm:pt-6">
			<div class="calendar-picker-container relative space-y-2">
				<label for="month-input" class="block text-sm font-medium text-neutral-300">
					When were you born?
				</label>

				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="relative flex items-center justify-between rounded-xl border border-neutral-700 bg-neutral-900/90 px-3 py-2.5 shadow-inner transition-colors focus-within:border-neutral-400 focus-within:ring-1 focus-within:ring-neutral-400 cursor-pointer md:cursor-default"
					onclick={handleBoxClick}
				>
					<div class="flex flex-1 items-center gap-1.5 font-mono text-base sm:gap-2 sm:text-lg">
						<input
							id="month-input"
							bind:this={monthInputElement}
							type="text"
							inputmode="numeric"
							pattern="[0-9]*"
							maxlength={2}
							placeholder="MM"
							value={monthInput}
							oninput={handleMonthInput}
							onkeydown={handleMonthKeydown}
							onpaste={handlePaste}
							class="w-11 rounded-lg bg-transparent py-1 text-center text-neutral-100 placeholder-neutral-500 transition-colors focus:bg-neutral-800/80 focus:outline-none sm:w-12"
							aria-label="Two digit birth month"
						/>
						<span class="text-neutral-500 select-none">/</span>
						<input
							bind:this={dayInputElement}
							type="text"
							inputmode="numeric"
							pattern="[0-9]*"
							maxlength={2}
							placeholder="DD"
							value={dayInput}
							oninput={handleDayInput}
							onkeydown={handleDayKeydown}
							onpaste={handlePaste}
							class="w-11 rounded-lg bg-transparent py-1 text-center text-neutral-100 placeholder-neutral-500 transition-colors focus:bg-neutral-800/80 focus:outline-none sm:w-12"
							aria-label="Two digit birth day"
						/>
						<span class="text-neutral-500 select-none">/</span>
						<input
							bind:this={yearInputElement}
							type="text"
							inputmode="numeric"
							pattern="[0-9]*"
							maxlength={4}
							placeholder="YYYY"
							value={yearInput}
							oninput={handleYearInput}
							onkeydown={handleYearKeydown}
							onpaste={handlePaste}
							class="w-16 rounded-lg bg-transparent py-1 text-center text-neutral-100 placeholder-neutral-500 transition-colors focus:bg-neutral-800/80 focus:outline-none sm:w-20"
							aria-label="Four digit birth year"
						/>
					</div>

					<button
						type="button"
						onclick={(event) => {
							event.stopPropagation();
							toggleCalendar();
						}}
						class="touch-manipulation rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
						aria-label="Open calendar picker"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</button>
				</div>

				{#if showCalendar}
					<div class="absolute top-full right-0 left-0 z-40 mt-2 hidden md:block">
						<CustomCalendar
							{selectedDate}
							onselect={handleCalendarSelect}
							onclose={closeCalendar}
						/>
					</div>
				{/if}
			</div>

			<button
				type="button"
				onclick={handleSubmit}
				disabled={!isValid}
				class="w-full touch-manipulation rounded-xl bg-neutral-100 px-6 py-3.5 font-medium text-neutral-900 transition-all duration-200 hover:bg-white hover:shadow-lg disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
			>
				Continue
			</button>
		</div>

		<div class="pt-2 sm:pt-4">
			<p class="text-xs leading-relaxed text-neutral-500">
				This visualization assumes a 90-year lifespan and is meant for reflection, not prediction
			</p>
		</div>
	</div>
</div>

{#if showCalendar}
	<div
		class="mobile-calendar-drawer fixed inset-0 z-50 flex flex-col justify-end md:hidden"
		role="dialog"
		aria-modal="true"
		aria-label="Select birth date"
	>
		<button
			type="button"
			class="fixed inset-0 cursor-default border-0 bg-black/75 backdrop-blur-sm"
			onclick={closeCalendar}
			aria-label="Close calendar backdrop"
		></button>
		<div
			class="relative z-10 max-h-[90vh] w-full overflow-y-auto rounded-t-3xl border-t border-neutral-700/80 bg-neutral-900 p-4 pb-8 shadow-2xl"
		>
			<div class="mx-auto mb-3 h-1 w-10 rounded-full bg-neutral-700"></div>

			<div class="mb-3 flex items-center justify-between px-1">
				<span class="text-sm font-medium text-neutral-300">Choose your birth date</span>
				<button
					type="button"
					onclick={closeCalendar}
					class="rounded-md bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-400 hover:text-white"
				>
					Done
				</button>
			</div>

			<CustomCalendar
				{selectedDate}
				isMobileModal={true}
				onselect={handleCalendarSelect}
				onclose={closeCalendar}
			/>
		</div>
	</div>
{/if}
