<script lang="ts">
	import { useSoundEffect } from '$lib/audio';
	import { SOUND_EFFECTS } from '$lib/constants';
	
	export let label: string = '';
	export let value: number = 50;
	export let name: string = '';
	export let min: number = 0;
	export let max: number = 100;

	let isDragging = false;
	let sliderContainer: HTMLDivElement;
	let previousValue = value;
	
	const { playSound } = useSoundEffect(SOUND_EFFECTS.DIGITAL_POP);

	function handleMouseDown(event: MouseEvent) {
		isDragging = true;
		updateValue(event);
		playSound();
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	}

	function handleMouseMove(event: MouseEvent) {
		if (isDragging) {
			updateValue(event);
		}
	}

	function handleMouseUp() {
		isDragging = false;
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	}

	function handleTouchStart(event: TouchEvent) {
		isDragging = true;
		updateValueFromTouch(event);
		playSound();
		window.addEventListener('touchmove', handleTouchMove);
		window.addEventListener('touchend', handleTouchEnd);
	}

	function handleTouchMove(event: TouchEvent) {
		if (isDragging) {
			updateValueFromTouch(event);
		}
	}

	function handleTouchEnd() {
		isDragging = false;
		window.removeEventListener('touchmove', handleTouchMove);
		window.removeEventListener('touchend', handleTouchEnd);
	}

	function updateValueFromTouch(event: TouchEvent) {
		if (event.touches.length > 0) {
			const touch = event.touches[0];
			const rect = sliderContainer.getBoundingClientRect();
			const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
			const percentage = x / rect.width;
			const newValue = Math.round(min + percentage * (max - min));
			
			if (newValue !== value) {
				value = newValue;
				playSound();
			}
		}
	}

	function updateValue(event: MouseEvent) {
		const rect = sliderContainer.getBoundingClientRect();
		const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
		const percentage = x / rect.width;
		const newValue = Math.round(min + percentage * (max - min));
		
		if (newValue !== value) {
			value = newValue;
			playSound();
		}
	}

	$: if (value !== previousValue && !isDragging) {
		playSound();
		previousValue = value;
	}

	$: percentage = ((value - min) / (max - min)) * 100;
	$: thumbPosition = `${percentage}%`;
	$: fillWidth = `${percentage}%`;
</script>

<fieldset class="group flex items-center justify-between gap-3">
	<label class="select-none font-normal" for={name}>
		{label}
	</label>
	<div class="w-3/5">
		<div class="flex grow items-center gap-2">
			<div
				class="dark:bg-dark-supertransparent flex h-7 w-12 items-center justify-center rounded-md border border-white/20 bg-white/5 text-[13px] mr-1"
			>
				{value}
			</div>
			<div
				class="group w-full touch-none select-none transition-[margin] hover:cursor-grab active:cursor-grabbing"
				bind:this={sliderContainer}
				on:mousedown={handleMouseDown}
				on:touchstart={handleTouchStart}
				role="slider"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
				aria-label={label}
				tabindex="0"
				id={label}
			>
				<div class="relative flex h-2 w-full items-center">
					<div
						class="dark:bg-dark-supertransparent h-7 w-full grow overflow-hidden rounded-md bg-white/5"
					>
						<div
							class="absolute h-7 rounded-md rounded-br-none rounded-tr-none bg-white/10 transition-colors duration-200 ease-out group-hover:bg-white/20 dark:bg-white/10"
							style="width: {fillWidth}"
						/>
					</div>
					<div
						class="absolute block h-7 w-3 rounded-[3px] bg-[#bdbdbd] outline-hidden transition-[height] group-hover:bg-[#ededed] dark:bg-[#dcdcdc]"
						style="left: {thumbPosition}; transform: translateX(-50%)"
						role="slider"
						aria-valuemin={min}
						aria-valuemax={max}
						aria-valuenow={value}
						tabindex="0"
						aria-label={label}
					/>
				</div>
			</div>
		</div>
	</div>
	<input {value} {name} type="hidden" />
</fieldset>
