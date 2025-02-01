<script lang="ts">
	export let show: boolean = true;
</script>

{#if show}
	<div class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
		<div class="mx-4 w-full max-w-xl rounded-lg border border-white/20 bg-[#141612] p-8 shadow-xl">
			<div class="text-center">
				<div class="flex flex-col justify-center gap-4 text-2xl font-semibold text-red-500">
					<h2>🚧 THIS SITE IS UNDER CONSTRUCTION</h2>
				</div>
			</div>
		</div>
	</div>
{/if}