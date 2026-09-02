<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { tick, onMount } from 'svelte';

	import { calculateLifeData, type LifeData } from '$lib/weekCalculations';

	import BirthDateInput from '../components/BirthDateInput.svelte';
	import WeekGrid from '../components/WeekGrid.svelte';
	import WeekStats from '../components/WeekStats.svelte';
	import Navigation from '../components/Navigation.svelte';
	//import MusicPlayer from '../components/MusicPlayer.svelte';

	let currentStep: 1 | 2 = 1;
	let lifeData: LifeData | null = null;
	let selectedDate: Date | null = null;

	function scrollToTop() {
		if (typeof window === 'undefined') return;
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}
		window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	}

	$: {
		const dateParam = $page.url.searchParams.get('birth_date');
		if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
			const [yearString, monthString, dayString] = dateParam.split('-');
			const parsedDate = new Date(Number(yearString), Number(monthString) - 1, Number(dayString));
			if (!isNaN(parsedDate.getTime())) {
				selectedDate = parsedDate;
				lifeData = calculateLifeData(parsedDate);
				currentStep = 2;
			} else {
				selectedDate = null;
				currentStep = 1;
			}
		} else {
			selectedDate = null;
			currentStep = 1;
		}
	}

	onMount(() => {
		if (currentStep === 2) {
			scrollToTop();
		}
	});

	function handleDateSelect(event: CustomEvent<Date>) {
		selectedDate = event.detail;
	}

	async function handleBirthDateSubmit() {
		if (selectedDate) {
			lifeData = calculateLifeData(selectedDate);
			const dateParam = [
				selectedDate.getFullYear(),
				String(selectedDate.getMonth() + 1).padStart(2, '0'),
				String(selectedDate.getDate()).padStart(2, '0')
			].join('-');
			const url = new URL(window.location.href);
			url.searchParams.set('birth_date', dateParam);

			currentStep = 2;
			scrollToTop();
			await goto(url.toString(), { replaceState: true, noScroll: false });
			await tick();
			scrollToTop();
		}
	}

	async function handleBack() {
		currentStep = 1;
		lifeData = null;
		selectedDate = null;
		scrollToTop();
		await goto('/', { replaceState: true, noScroll: false });
		await tick();
		scrollToTop();
	}
</script>

{#if currentStep === 1}
	<BirthDateInput {selectedDate} on:select={handleDateSelect} on:submit={handleBirthDateSubmit} />
{:else if currentStep === 2 && lifeData}
	<Navigation on:back={handleBack} />
	<div class="min-h-screen px-4 pt-16 pb-24 md:pb-16">
		<div class="mx-auto flex max-w-6xl flex-col items-center gap-12">
			<WeekGrid {lifeData} />
			<WeekStats {lifeData} />
		</div>
	</div>
{/if}
