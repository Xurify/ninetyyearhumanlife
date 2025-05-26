<script lang="ts">
	import Slider from './Slider.svelte';

	export let age: number = 20;
	export let selectedMonthIndex: number | null = null;
	export let showAdvanced: boolean = false;

	const toggleAdvanced = () => {
		showAdvanced = !showAdvanced;
	};
</script>

<div class="flex flex-col gap-4">
	<button
		on:click={toggleAdvanced}
		class="text-sm text-blue-400 underline transition-colors hover:text-blue-300"
	>
		{showAdvanced ? 'Hide Details' : 'Show Details'}
	</button>

	<div class="flex flex-col items-center gap-4 lg:flex-row lg:justify-center lg:gap-6">
		<div class="w-full max-w-md rounded-lg border border-white/20 bg-[#141612] p-4 lg:w-60">
			<Slider label="Age" bind:value={age} name="age" min={0} max={90} />
		</div>

		<div class="w-full max-w-md rounded-lg border border-white/20 bg-[#141612] p-4 lg:w-60">
			<span>Selected Month: </span>
			<b>
				{#if selectedMonthIndex}
					{selectedMonthIndex + 1}
				{:else}
					None
				{/if}
			</b>
		</div>
	</div>
</div>
