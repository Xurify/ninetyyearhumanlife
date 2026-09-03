<script lang="ts">
	import { tick, onMount } from 'svelte';

	import { calculateLifeData, type LifeData } from '$lib/weekCalculations';

	import BirthDateInput from '../components/BirthDateInput.svelte';
	import WeekGrid from '../components/WeekGrid.svelte';
	import WeekStats from '../components/WeekStats.svelte';
	import Navigation from '../components/Navigation.svelte';
	import MusicPlayer from '../components/MusicPlayer.svelte';

	let currentStep: 1 | 2 = $state(1);
	let lifeData: LifeData | null = $state(null);
	let selectedDate: Date | null = $state(null);
	let stepContainer: HTMLElement | null = $state(null);
	let topAnchor: HTMLElement | null = $state(null);

	function forceScrollToTop(): void {
		if (typeof window === 'undefined') return;

		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}

		const resetScroll = (): void => {
			window.scrollTo(0, 0);
			if (document.documentElement) {
				document.documentElement.scrollTop = 0;
			}
			if (document.body) {
				document.body.scrollTop = 0;
			}
			if (document.scrollingElement) {
				document.scrollingElement.scrollTop = 0;
			}
			topAnchor?.scrollIntoView(true);
		};

		resetScroll();
		requestAnimationFrame(resetScroll);
		setTimeout(resetScroll, 50);
		setTimeout(resetScroll, 100);
		setTimeout(resetScroll, 200);
		setTimeout(resetScroll, 350);
		setTimeout(resetScroll, 500);

		if (window.visualViewport) {
			const viewport = window.visualViewport;
			const handleViewportChange = (): void => {
				resetScroll();
			};
			viewport.addEventListener('resize', handleViewportChange);
			viewport.addEventListener('scroll', handleViewportChange);
			setTimeout(() => {
				viewport.removeEventListener('resize', handleViewportChange);
				viewport.removeEventListener('scroll', handleViewportChange);
			}, 600);
		}
	}

	onMount(() => {
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}

		const searchParams = new URLSearchParams(window.location.search);
		const dateParam = searchParams.get('birth_date');
		if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
			const [yearString, monthString, dayString] = dateParam.split('-');
			const parsedDate = new Date(Number(yearString), Number(monthString) - 1, Number(dayString));
			if (!isNaN(parsedDate.getTime())) {
				selectedDate = parsedDate;
				lifeData = calculateLifeData(parsedDate);
				currentStep = 2;
				forceScrollToTop();
			}
		}
	});

	function handleDateSelect(date: Date): void {
		selectedDate = date;
	}

	async function handleBirthDateSubmit(submittedDate?: Date): Promise<void> {
		const targetDate = submittedDate || selectedDate;
		if (targetDate) {
			if (document.activeElement instanceof HTMLElement) {
				document.activeElement.blur();
			}

			window.scrollTo(0, 0);
			if (document.documentElement) {
				document.documentElement.scrollTop = 0;
			}
			if (document.body) {
				document.body.scrollTop = 0;
			}

			selectedDate = targetDate;
			lifeData = calculateLifeData(targetDate);
			currentStep = 2;

			const dateParam = [
				targetDate.getFullYear(),
				String(targetDate.getMonth() + 1).padStart(2, '0'),
				String(targetDate.getDate()).padStart(2, '0')
			].join('-');
			const url = new URL(window.location.href);
			url.searchParams.set('birth_date', dateParam);

			window.history.replaceState(null, '', url.toString());

			await tick();
			forceScrollToTop();
		}
	}

	async function handleBack(): Promise<void> {
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}

		window.scrollTo(0, 0);
		if (document.documentElement) {
			document.documentElement.scrollTop = 0;
		}
		if (document.body) {
			document.body.scrollTop = 0;
		}

		currentStep = 1;
		lifeData = null;
		selectedDate = null;

		window.history.replaceState(null, '', '/');

		await tick();
		forceScrollToTop();
	}

	function handlePopState(): void {
		const searchParams = new URLSearchParams(window.location.search);
		const dateParam = searchParams.get('birth_date');
		if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
			const [yearString, monthString, dayString] = dateParam.split('-');
			const parsedDate = new Date(Number(yearString), Number(monthString) - 1, Number(dayString));
			if (!isNaN(parsedDate.getTime())) {
				selectedDate = parsedDate;
				lifeData = calculateLifeData(parsedDate);
				currentStep = 2;
				forceScrollToTop();
				return;
			}
		}

		selectedDate = null;
		lifeData = null;
		currentStep = 1;
		forceScrollToTop();
	}
</script>

<svelte:window onpopstate={handlePopState} />

<div id="top" bind:this={topAnchor} class="pointer-events-none h-0 w-0" aria-hidden="true"></div>

{#if currentStep === 1}
	<BirthDateInput bind:selectedDate onselect={handleDateSelect} onsubmit={handleBirthDateSubmit} />
{:else if currentStep === 2 && lifeData}
	<Navigation onback={handleBack} />
	<div bind:this={stepContainer} class="min-h-screen px-4 pt-16 pb-24 md:pb-16">
		<div class="mx-auto flex max-w-6xl flex-col items-center gap-12">
			<WeekGrid {lifeData} />
			<WeekStats {lifeData} />
		</div>
	</div>
	<!--<MusicPlayer />-->
{/if}
