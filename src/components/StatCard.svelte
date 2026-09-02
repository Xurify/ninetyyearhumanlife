<script lang="ts">
	interface Props {
		value: string | number;
		label: string;
		size?: 'sm' | 'md' | 'lg';
	}

	let { value, label, size = 'md' }: Props = $props();
</script>

<div class="flex-1 rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 text-center">
	<div
		class={`mb-2 font-light text-neutral-100 ${size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-2xl'}`}
	>
		{value}
	</div>
	<div class="text-sm text-neutral-400">{label}</div>
</div>
