<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ submit: Date }>();

	let birthDate = '';
	let isValid = false;

	$: {
		if (birthDate) {
			const date = new Date(birthDate);
			const now = new Date();
			isValid = date instanceof Date && !isNaN(date.getTime()) && date <= now;
		} else {
			isValid = false;
		}
	}

	function handleSubmit() {
		if (isValid) {
			dispatch('submit', new Date(birthDate));
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && isValid) {
			handleSubmit();
		}
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center px-4">
	<div class="w-full max-w-md space-y-8 text-center">
		<div class="space-y-4">
			<h1 class="text-3xl font-light tracking-wide text-neutral-100 sm:text-4xl">
				Ninety Year Human Life
			</h1>
			<p class="text-lg text-neutral-400 font-light leading-relaxed">
				A simple visualization to help you reflect on the time you have
			</p>
		</div>

		<div class="space-y-6 pt-8">
			<div class="space-y-2">
				<label for="birthdate" class="block text-sm font-medium text-neutral-300">
					When were you born?
				</label>
				<input
					id="birthdate"
					type="date"
					bind:value={birthDate}
					on:keydown={handleKeydown}
					class="w-full rounded-lg border border-neutral-600 bg-neutral-800 px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-colors"
					max={new Date().toISOString().split('T')[0]}
				/>
			</div>

			<button
				on:click={handleSubmit}
				disabled={!isValid}
				class="w-full rounded-lg bg-neutral-100 px-6 py-3 text-neutral-900 font-medium transition-all duration-200 hover:bg-white disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed"
			>
				Continue
			</button>
		</div>

		<div class="pt-4">
			<p class="text-xs text-neutral-500 leading-relaxed">
				This visualization assumes a 90-year lifespan and is meant for reflection, not prediction
			</p>
		</div>
	</div>
</div>
