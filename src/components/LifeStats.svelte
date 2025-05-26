<script lang="ts">
	export let monthsLived: number = 0;
	export let showAdvanced: boolean = false;

	const totalMonths: number = 1080;

	const toggleAdvanced = () => {
		showAdvanced = !showAdvanced;
	};
</script>

<div class="flex flex-col gap-2 text-center text-sm">
	<div class="flex flex-col gap-1">
		<p class="text-orange-500">Each row is 36 months = 3 years</p>
		<p>Months lived: {monthsLived}</p>
		<p>Months remaining: {totalMonths - monthsLived}</p>
	</div>

	<button
		on:click={toggleAdvanced}
		class="text-sm text-blue-400 hover:text-blue-300 underline"
	>
		{showAdvanced ? 'Hide Details' : 'Show Details'}
	</button>
</div>
