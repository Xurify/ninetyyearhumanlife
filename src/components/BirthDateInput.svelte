<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import CustomCalendar from './CustomCalendar.svelte';

	const dispatch = createEventDispatcher<{ submit: Date, select: Date }>();

	export let selectedDate: Date | null = null;
	let showCalendar = false;
	let inputElement: HTMLInputElement;

	$: isValid = selectedDate !== null;
	$: displayValue = selectedDate ? formatDate(selectedDate) : '';

	function formatDate(date: Date): string {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function handleDateSelect(event: CustomEvent<Date>) {
		dispatch('select', event.detail);
		showCalendar = false;
		inputElement?.blur();
	}

	function toggleCalendar() {
		showCalendar = !showCalendar;
	}

	function handleSubmit() {
		if (isValid && selectedDate) {
			dispatch('submit', selectedDate);
		}
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as Element;
		if (!target.closest('.calendar-container')) {
			showCalendar = false;
		}
	}

	onMount(() => {
		function handleGlobalKeydown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				showCalendar = false;
			}
		}
		window.addEventListener('keydown', handleGlobalKeydown);
		return () => {
			window.removeEventListener('keydown', handleGlobalKeydown);
		};
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex min-h-screen flex-col items-center justify-center px-4" on:click={handleClickOutside}>
	<div class="w-full max-w-md space-y-8 text-center">
		<div class="space-y-4">
			<div class="flex justify-center">
				<img src="/icon.svg" alt="App Icon" class="w-20 h-20" width={150} height={150} loading="eager" />
			</div>
			<h1 class="text-3xl font-light tracking-wide text-neutral-100 sm:text-4xl">
				Ninety Year Human Life
			</h1>
			<p class="text-lg text-neutral-400 font-light leading-relaxed">
				A simple visualization to help you reflect on the time you have
			</p>
		</div>

		<div class="space-y-6 pt-8">
			<div class="space-y-2 relative calendar-container">
				<label for="birthdate" class="block text-sm font-medium text-neutral-300">
					When were you born?
				</label>
				<div class="relative">
					<input
						id="birthdate"
						bind:this={inputElement}
						type="text"
						value={displayValue}
						on:focus={() => showCalendar = true}
						placeholder="Select your birth date"
						readonly
						class="w-full rounded-lg border border-neutral-600 bg-neutral-800 px-4 py-3 pr-12 text-neutral-100 placeholder-neutral-500 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-colors cursor-pointer"
					/>
					<button
						type="button"
						on:click={toggleCalendar}
						class="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-200 transition-colors"
						aria-label="Open calendar"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
					</button>
				</div>

				{#if showCalendar}
					<div class="absolute top-full left-0 right-0 z-50 mt-1">
						<CustomCalendar selectedDate={selectedDate} on:select={handleDateSelect} />
					</div>
				{/if}
			</div>

			<button
				on:click={handleSubmit}
				disabled={!isValid}
				class="w-full rounded-lg bg-neutral-100 px-6 py-3 text-neutral-900 font-medium transition-all duration-200 hover:bg-white disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed"
			>
				Continue
			</button>
		</div>

		<div class="pt-4">
			<p class="text-xs text-neutral-500 leading-relaxed">
				This visualization assumes a 90-year lifespan and is meant for reflection, not prediction
			</p>
		</div>
	</div>
</div>
