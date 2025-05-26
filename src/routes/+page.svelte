<script lang="ts">
	import ControlPanel from '../components/ControlPanel.svelte';
	import LifeGrid from '../components/LifeGrid.svelte';
	import LifeStats from '../components/LifeStats.svelte';
	import TimePerception from '../components/TimePerception.svelte';
	import EducationalSection from '../components/EducationalSection.svelte';
	import AllReferences from '../components/AllReferences.svelte';
	import { getTimePerceptionForAge, getTimePerceptionForMonth } from '../lib/timePerceptionData';

	let age: number = 20;

	$: monthsLived = age * 12;
	let selectedMonthIndex: number | null = null;
	let showAdvanced: boolean = false;

	$: currentTimePerception = getTimePerceptionForAge(age);
	$: selectedTimePerception = selectedMonthIndex !== null
		? getTimePerceptionForMonth(selectedMonthIndex)
		: currentTimePerception;

	const handleClick = (monthIndex: number) => {
		if (monthIndex === selectedMonthIndex) {
			selectedMonthIndex = null;
			return;
		}
		selectedMonthIndex = monthIndex;
	};
</script>

<div class="mx-auto flex max-w-4xl flex-col items-center gap-6 p-4">
	<h1 class="text-center text-2xl font-bold lg:text-3xl">
		A 90-Year Human Life in Months
	</h1>
	<ControlPanel bind:age {selectedMonthIndex} />
	<LifeGrid {monthsLived} {selectedMonthIndex} {handleClick} />
	<LifeStats {monthsLived} bind:showAdvanced />
	{#if showAdvanced}
		<TimePerception
			timePerceptionData={selectedTimePerception}
			currentAge={age}
			selectedMonth={selectedMonthIndex}
		/>
		<EducationalSection />
		<AllReferences />
	{/if}
</div>
