<script lang="ts">
	export let value: string | number;
	export let label: string;
	export let size: 'sm' | 'md' | 'lg' = 'md';
</script>

<div class="text-center p-6 rounded-lg bg-neutral-900/50 border border-neutral-800 flex-1">
	<div class={`font-light text-neutral-100 mb-2 ${size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-2xl'}`}>
		{value}
	</div>
	<div class="text-sm text-neutral-400">{label}</div>
</div> 