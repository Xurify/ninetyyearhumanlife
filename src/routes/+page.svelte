<script lang="ts">
	import BirthDateInput from '../components/BirthDateInput.svelte';
	import WeekGrid from '../components/WeekGrid.svelte';
	import WeekStats from '../components/WeekStats.svelte';
	import Navigation from '../components/Navigation.svelte';
	import { calculateLifeData, type LifeData } from '../lib/weekCalculations';

	let currentStep: 'input' | 'visualization' = 'input';
	let lifeData: LifeData | null = null;

	function handleBirthDateSubmit(event: CustomEvent<Date>) {
		const birthDate = event.detail;
		lifeData = calculateLifeData(birthDate);
		currentStep = 'visualization';
	}

	function handleBack() {
		currentStep = 'input';
		lifeData = null;
	}
</script>

{#if currentStep === 'input'}
	<BirthDateInput on:submit={handleBirthDateSubmit} />
{:else if currentStep === 'visualization' && lifeData}
	<Navigation on:back={handleBack} />
	<div class="min-h-screen px-4 py-16">
		<div class="mx-auto flex max-w-6xl flex-col items-center gap-12">
			<WeekGrid {lifeData} />
			<WeekStats {lifeData} />
		</div>
	</div>
{/if}
