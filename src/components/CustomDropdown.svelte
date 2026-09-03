<script lang="ts">
	interface Props {
		value: number;
		options?: number[];
		placeholder?: string;
		maxHeight?: string;
		onchange?: (option: number) => void;
	}

	let {
		value = $bindable(),
		options = [],
		placeholder = 'Select...',
		maxHeight = '200px',
		onchange
	}: Props = $props();

	let isOpen = $state(false);
	let scrollContainer = $state<HTMLDivElement>();

	let selectedOption = $derived(options.find((option) => option === value) || value);

	function toggleDropdown(): void {
		isOpen = !isOpen;
		if (isOpen) {
			setTimeout(() => scrollToSelected(), 0);
		}
	}

	function scrollToSelected(): void {
		if (!scrollContainer || !selectedOption) return;

		const selectedIndex = options.findIndex((option) => option === selectedOption);
		if (selectedIndex >= 0) {
			const itemHeight = 40;
			const scrollTop = selectedIndex * itemHeight - 80;
			scrollContainer.scrollTop = Math.max(0, scrollTop);
		}
	}

	function selectOption(option: number): void {
		value = option;
		isOpen = false;
		onchange?.(option);
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}

	function handleClickOutside(event: MouseEvent): void {
		const target = event.target as Element;
		if (!target.closest('.custom-dropdown')) {
			isOpen = false;
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="custom-dropdown relative">
	<button
		type="button"
		onclick={toggleDropdown}
		class="hover:bg-neutral-650 flex w-full touch-manipulation items-center justify-between rounded border border-neutral-600 bg-neutral-700 px-2 py-2 text-xs text-neutral-100 transition-colors focus:border-neutral-400 focus:outline-none sm:px-3 sm:py-2 sm:text-sm"
	>
		<span class="truncate">
			{selectedOption || placeholder}
		</span>
		<svg
			class="h-4 w-4 text-neutral-400 transition-transform duration-200 {isOpen
				? 'rotate-180'
				: ''}"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	{#if isOpen}
		<div
			class="absolute top-full right-0 left-0 z-50 mt-1 overflow-hidden rounded-lg border border-neutral-600 bg-neutral-700 shadow-xl"
			style="max-height: {maxHeight};"
		>
			<div class="overflow-y-auto" style="max-height: {maxHeight};" bind:this={scrollContainer}>
				{#each options as option}
					<button
						type="button"
						onclick={(event) => {
							event.stopPropagation();
							selectOption(option);
						}}
						class="block w-full px-3 py-2 text-left text-sm text-neutral-100 transition-colors hover:bg-neutral-600
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

	.custom-dropdown div {
		scrollbar-width: thin;
		scrollbar-color: #525252 transparent;
	}
</style>
