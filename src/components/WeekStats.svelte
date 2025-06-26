<script lang="ts">
	import type { LifeData } from '../lib/weekCalculations';
	import { formatDate, getLifeStage } from '../lib/weekCalculations';

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
			return "Past the halfway point. Experience accumulates, wisdom deepens.";
		} else {
			return "In life's final quarter. Each moment carries the weight of all that came before.";
		}
	}
</script>

<div class="w-full max-w-2xl space-y-8">
	<div class="text-center space-y-4">
		<h2 class="text-2xl font-light text-neutral-100">
			{Math.round(lifeData.percentageLived)}% of your life has passed
		</h2>
		<p class="text-neutral-400 leading-relaxed">
			{getReflectiveMessage()}
		</p>
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
		<div class="space-y-6">
			<div class="text-center p-6 rounded-lg bg-neutral-900/50 border border-neutral-800">
				<div class="text-3xl font-light text-neutral-100 mb-2">
					{formatNumber(lifeData.weeksLived)}
				</div>
				<div class="text-sm text-neutral-400">weeks lived</div>
			</div>

			<div class="text-center p-6 rounded-lg bg-neutral-900/50 border border-neutral-800">
				<div class="text-3xl font-light text-neutral-100 mb-2">
					{formatNumber(lifeData.daysLived)}
				</div>
				<div class="text-sm text-neutral-400">days on earth</div>
			</div>

			<div class="text-center p-6 rounded-lg bg-neutral-900/50 border border-neutral-800">
				<div class="text-3xl font-light text-neutral-100 mb-2">
					{Math.round(lifeData.yearsLived * 10) / 10}
				</div>
				<div class="text-sm text-neutral-400">years old</div>
			</div>
		</div>

		<div class="space-y-6">
			<div class="text-center p-6 rounded-lg bg-neutral-900/50 border border-neutral-800">
				<div class="text-3xl font-light text-neutral-100 mb-2">
					{formatNumber(lifeData.weeksRemaining)}
				</div>
				<div class="text-sm text-neutral-400">weeks remaining</div>
			</div>

			<div class="text-center p-6 rounded-lg bg-neutral-900/50 border border-neutral-800">
				<div class="text-3xl font-light text-neutral-100 mb-2">
					{weeksSinceNewYear}
				</div>
				<div class="text-sm text-neutral-400">weeks into this year</div>
			</div>

			<div class="text-center p-6 rounded-lg bg-neutral-900/50 border border-neutral-800">
				<div class="text-lg font-light text-neutral-100 mb-2 capitalize">
					{lifeStage}
				</div>
				<div class="text-sm text-neutral-400">current life stage</div>
			</div>
		</div>
	</div>

	<div class="text-center space-y-2 pt-4">
		<p class="text-sm text-neutral-500">
			Born on {formatDate(lifeData.birthDate)}
		</p>
		<p class="text-xs text-neutral-600">
			Time is the most valuable thing we can spend
		</p>
	</div>
</div>
