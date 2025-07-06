<script lang="ts">
	import type { LifeData } from '../lib/weekCalculations';
	import { getLifeStage } from '../lib/weekCalculations';
	import { formatDate } from '../lib/date';
	import StatCard from './StatCard.svelte';

	export let lifeData: LifeData;

	$: lifeStage = getLifeStage(lifeData.yearsLived);
	$: weeksSinceNewYear = (() => {
		const now = new Date();
		const startOfYear = new Date(now.getFullYear(), 0, 1);
		const timeDiff = now.getTime() - startOfYear.getTime();
		return Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
	})();

	function formatNumber(num: number): string {
		return num.toLocaleString();
	}

	function getReflectiveMessage(): string {
		const percentage = lifeData.percentageLived;
		if (percentage < 25) {
			return "You're in the first quarter of life. Time feels infinite, and it largely is.";
		} else if (percentage < 50) {
			return "You've crossed the first quarter. Patterns are forming, choices are shaping your path.";
		} else if (percentage < 75) {
			return 'Past the halfway point. Experience accumulates, wisdom deepens.';
		} else {
			return "In life's final quarter. Each moment carries the weight of all that came before.";
		}
	}
</script>

<div class="w-full max-w-2xl space-y-8">
	<div class="space-y-4 text-center">
		<h2 class="text-2xl font-light text-neutral-100">
			{Math.round(lifeData.percentageLived)}% of your life has passed
		</h2>
		<p class="leading-relaxed text-neutral-400">
			{getReflectiveMessage()}
		</p>
	</div>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
		<StatCard value={formatNumber(lifeData.weeksLived)} label="weeks lived" size="lg" />
		<StatCard value={formatNumber(lifeData.weeksRemaining)} label="weeks remaining" size="lg" />
		<StatCard value={formatNumber(lifeData.daysLived)} label="days on earth" size="lg" />
		<StatCard value={weeksSinceNewYear} label="weeks into this year" size="lg" />
		<StatCard value={Math.round(lifeData.yearsLived * 10) / 10} label="years old" size="lg" />
		<StatCard value={lifeStage} label="current life stage" size="sm" />
	</div>

	<div class="space-y-2 pt-4 text-center">
		<p class="text-sm text-neutral-500">
			Born on {formatDate(lifeData.birthDate)}
		</p>
		<p class="text-xs text-neutral-600">Time is the most valuable thing we can spend</p>
	</div>
</div>
