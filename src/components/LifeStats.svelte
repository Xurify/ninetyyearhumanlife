<script lang="ts">
	export let monthsLived: number = 0;

	const totalMonths: number = 1080;
</script>

<div class="flex flex-col gap-1 text-center text-sm">
	<p class="text-orange-500">Each row is 36 months (3 years)</p>
	<p>Months lived: {monthsLived}</p>
	<p>Months remaining: {totalMonths - monthsLived}</p>
</div>
