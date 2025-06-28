<script lang="ts">
	import BirthDateInput from '../components/BirthDateInput.svelte';
	import WeekGrid from '../components/WeekGrid.svelte';
	import WeekStats from '../components/WeekStats.svelte';
	import Navigation from '../components/Navigation.svelte';
	import { calculateLifeData, type LifeData } from '../lib/weekCalculations';

	let currentStep: 1 | 2 = 1;
	let lifeData: LifeData | null = null;

	function handleBirthDateSubmit(event: CustomEvent<Date>) {
		const birthDate = event.detail;
		lifeData = calculateLifeData(birthDate);
		currentStep = 2;
	}

	function handleBack() {
		currentStep = 1;
		lifeData = null;
	}
</script>

{#if currentStep === 1}
	<BirthDateInput on:submit={handleBirthDateSubmit} />
{:else if currentStep === 2 && lifeData}
	<Navigation on:back={handleBack} />
	<div class="min-h-screen px-4 py-16">
		<div class="mx-auto flex max-w-6xl flex-col items-center gap-12">
			<WeekGrid {lifeData} />
			<WeekStats {lifeData} />
		</div>
	</div>
{/if}
