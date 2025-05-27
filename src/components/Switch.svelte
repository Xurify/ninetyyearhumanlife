<script lang="ts">
	export let label: string = '';
	export let checked: boolean = false;
	export let name: string = '';
	export let disabled: boolean = false;

	function toggle() {
		if (!disabled) {
			checked = !checked;
		}
	}
</script>

<div class="flex items-center space-x-2">
	<button
		type="button"
		role="switch"
		aria-checked={checked}
		data-state={checked ? 'checked' : 'unchecked'}
		value="on"
		class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-white/20 data-[state=unchecked]:bg-white/5 dark:data-[state=checked]:bg-white/20 dark:data-[state=unchecked]:bg-dark-supertransparent"
		id={name}
		on:click={toggle}
		{disabled}
	>
		<span
			data-state={checked ? 'checked' : 'unchecked'}
			class="pointer-events-none block h-4 w-4 rounded-full bg-[#bdbdbd] shadow-lg ring-0 transition-transform group-hover:bg-[#ededed] dark:bg-[#dcdcdc] data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
		></span>
	</button>
	<label
		class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
		for={name}
	>
		{label}
	</label>
	<input {checked} {name} type="hidden" />
</div> 