<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { calculateLifeData, type LifeData } from '$lib/weekCalculations';

	import BirthDateInput from '../components/BirthDateInput.svelte';
	import WeekGrid from '../components/WeekGrid.svelte';
	import WeekStats from '../components/WeekStats.svelte';
	import Navigation from '../components/Navigation.svelte';

	let currentStep: 1 | 2 = 1;
	let lifeData: LifeData | null = null;

	$: {
		const dateParam = $page.url.searchParams.get('birth_date');
		if (dateParam && !isNaN(new Date(dateParam).getTime())) {
			lifeData = calculateLifeData(new Date(dateParam));
			currentStep = 2;
		}
	}

	function handleBirthDateSubmit(event: CustomEvent<Date>) {
		const birthDate = event.detail;
		lifeData = calculateLifeData(birthDate);

		const dateParam = birthDate.toISOString().slice(0, 10);
		const url = new URL(window.location.href);
		url.searchParams.set('birth_date', dateParam);

		currentStep = 2;
		goto(url.toString(), { replaceState: true });
	}

	function handleBack() {
		currentStep = 1;
		lifeData = null;
		goto('/', { replaceState: true });
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
