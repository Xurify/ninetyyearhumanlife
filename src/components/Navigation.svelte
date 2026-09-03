<script lang="ts">
	interface Props {
		onback?: () => void | Promise<void>;
	}

	let { onback }: Props = $props();

	function handleBack(): void {
		onback?.();
	}
</script>

<div class="fixed top-4 left-4 z-10">
	<button
		type="button"
		onclick={handleBack}
		class="flex items-center gap-2 px-4 py-2 text-sm text-neutral-400 transition-colors duration-200 hover:text-neutral-200"
	>
		<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
		</svg>
		<span>Back</span>
	</button>
</div>
