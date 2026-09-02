<script lang="ts">
	export let value: string | number;
	export let label: string;
	export let size: 'sm' | 'md' | 'lg' = 'md';
</script>

<div class="flex-1 rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 text-center">
	<div
		class={`mb-2 font-light text-neutral-100 ${size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-2xl'}`}
	>
		{value}
	</div>
	<div class="text-sm text-neutral-400">{label}</div>
</div>
