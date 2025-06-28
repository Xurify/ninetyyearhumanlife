<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: number;
	export let options: number[] = [];
	export let placeholder = 'Select...';
	export let maxHeight = '200px';

	const dispatch = createEventDispatcher<{ change: number }>();

	let isOpen = false;
	let scrollContainer: HTMLDivElement;

	$: selectedOption = options.find(option => option === value) || value;

	function toggleDropdown() {
		isOpen = !isOpen;
		if (isOpen) {
			setTimeout(() => scrollToSelected(), 0);
		}
	}

	function scrollToSelected() {
		if (!scrollContainer || !selectedOption) return;

		const selectedIndex = options.findIndex(option => option === selectedOption);
		if (selectedIndex >= 0) {
			const itemHeight = 40;
			const scrollTop = selectedIndex * itemHeight - 80;
			scrollContainer.scrollTop = Math.max(0, scrollTop);
		}
	}

	function selectOption(option: number) {
		value = option;
		isOpen = false;
		dispatch('change', option);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as Element;
		if (!target.closest('.custom-dropdown')) {
			isOpen = false;
		}
	}

	$: if (typeof window !== 'undefined') {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
		} else {
			document.removeEventListener('click', handleClickOutside);
		}
	}

</script>

<svelte:window on:keydown={handleKeydown} />

<div class="custom-dropdown relative">
	<button
		type="button"
		on:click={toggleDropdown}
		class="w-full bg-neutral-700 text-neutral-100 rounded px-2 sm:px-3 py-2 sm:py-2 text-xs sm:text-sm border border-neutral-600 focus:border-neutral-400 focus:outline-none transition-colors flex items-center justify-between hover:bg-neutral-650 touch-manipulation"
	>
		<span class="truncate">
			{selectedOption || placeholder}
		</span>
		<svg 
			class="w-4 h-4 text-neutral-400 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}" 
			fill="none" 
			stroke="currentColor" 
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	{#if isOpen}
		<div
			class="absolute top-full left-0 right-0 z-50 mt-1 bg-neutral-700 border border-neutral-600 rounded-lg shadow-xl overflow-hidden"
			style="max-height: {maxHeight};"
		>
			<div class="overflow-y-auto" style="max-height: {maxHeight};" bind:this={scrollContainer}>
				{#each options as option}
					<button
						type="button"
						on:click|stopPropagation={() => selectOption(option)}
						class="w-full px-3 py-2 text-sm text-left text-neutral-100 hover:bg-neutral-600 transition-colors block
							{option === selectedOption ? 'bg-neutral-600' : ''}"
					>
						{option}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	/* Custom scrollbar for the dropdown - shadcn/Radix style */
	.custom-dropdown div::-webkit-scrollbar {
		width: 8px;
	}

	.custom-dropdown div::-webkit-scrollbar-track {
		background: transparent;
	}

	.custom-dropdown div::-webkit-scrollbar-thumb {
		background: #525252;
		border-radius: 4px;
		border: 2px solid transparent;
		background-clip: content-box;
	}

	.custom-dropdown div::-webkit-scrollbar-thumb:hover {
		background: #737373;
		background-clip: content-box;
	}

	/* Firefox scrollbar */
	.custom-dropdown div {
		scrollbar-width: thin;
		scrollbar-color: #525252 transparent;
	}
</style>
