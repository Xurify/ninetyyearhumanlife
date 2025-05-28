<script lang="ts">
	import { onMount } from 'svelte';

	export let label: string = '';
	export let checked: boolean = false;
	export let name: string = '';
	export let disabled: boolean = false;

	let audioContext: AudioContext;
	let audioBuffer: AudioBuffer;
	let lastSoundTime = 0;

	onMount(async () => {
		try {
			audioContext = new (window.AudioContext || window.webkitAudioContext)();

			const response = await fetch('/assets/digital-pop.mp3');
			const arrayBuffer = await response.arrayBuffer();
			audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
		} catch (error) {
			console.error('Error initializing audio:', error);
		}
	});

	function playSound() {
		if (!audioContext || !audioBuffer) return;

		const now = Date.now();
		if (now - lastSoundTime > 30) {
			try {
				const source = audioContext.createBufferSource();
				source.buffer = audioBuffer;

				const gainNode = audioContext.createGain();
				gainNode.gain.value = 0.3;

				source.connect(gainNode);
				gainNode.connect(audioContext.destination);

				source.start(0);
				lastSoundTime = now;
			} catch (error) {
				console.error('Error playing sound:', error);
			}
		}
	}

	function toggle() {
		if (!disabled) {
			checked = !checked;
			playSound();
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
		class="peer focus-visible:ring-ring focus-visible:ring-offset-background dark:data-[state=unchecked]:bg-dark-supertransparent inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-white/20 data-[state=unchecked]:bg-white/5 dark:data-[state=checked]:bg-white/20"
		id={name}
		on:click={toggle}
		{disabled}
	>
		<span
			data-state={checked ? 'checked' : 'unchecked'}
			class="pointer-events-none block h-4 w-4 rounded-full bg-[#bdbdbd] ring-0 shadow-lg transition-transform group-hover:bg-[#ededed] data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 dark:bg-[#dcdcdc]"
		></span>
	</button>
	<label
		class="text-sm leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		for={name}
	>
		{label}
	</label>
	<input {checked} {name} type="hidden" />
</div>
