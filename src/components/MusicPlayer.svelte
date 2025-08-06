<script lang="ts">
	import { onMount } from 'svelte';
	import { MUSIC_TRACKS } from '$lib/constants';

	let audio: HTMLAudioElement;
	let isPlaying = false;
	let volume = 0.15;
	let currentTrackIndex = 0;

	const tracks = Object.values(MUSIC_TRACKS);
	$: currentTrack = tracks[currentTrackIndex];

	onMount(() => {
		audio = new Audio(currentTrack.url);
		audio.volume = volume;
		
		audio.addEventListener('ended', () => {
			isPlaying = false;
			nextTrack();
		});

		audio.play();
		isPlaying = true;

		return () => {
			audio?.pause();
		};
	});

	function togglePlayPause() {
		if (isPlaying) {
			audio.pause();
			isPlaying = false;
		} else {
			audio.play();
			isPlaying = true;
		}
	}

	function nextTrack() {
		currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
		if (audio) {
			audio.src = currentTrack.url;
			if (isPlaying) {
				audio.play();
			}
		}
	}

	function handleVolumeChange(event: Event) {
		const target = event.target as HTMLInputElement;
		volume = parseFloat(target.value);
		if (audio) {
			audio.volume = volume;
		}
	}


</script>

<div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:transform-none md:top-6 md:left-auto md:right-4 z-50">
	<div class="relative bg-neutral-900/95 backdrop-blur-md border border-neutral-700 rounded-lg shadow-lg px-3 py-2 md:px-4 md:py-3">

		<div class="flex items-center gap-2 md:gap-3">
			<div class="hidden sm:flex sm:flex-col min-w-0">
				<div class="text-xs font-medium text-neutral-200 truncate">{currentTrack.title}</div>
				<div class="text-xs text-neutral-500 truncate">Ambient Music</div>
			</div>

			<div class="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
				<button
					on:click={togglePlayPause}
					class="w-6 h-6 md:w-7 md:h-7 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors"
				>
					{#if isPlaying}
						<svg class="w-2.5 h-2.5 md:w-3 md:h-3 text-neutral-100" fill="currentColor" viewBox="0 0 24 24">
							<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
						</svg>
					{:else}
						<svg class="w-2.5 h-2.5 md:w-3 md:h-3 text-neutral-100 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M8 5v14l11-7z"/>
						</svg>
					{/if}
				</button>

				<button
					on:click={nextTrack}
					class="w-5 h-5 md:w-6 md:h-6 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors"
				>
					<svg class="w-2.5 h-2.5 md:w-3 md:h-3 text-neutral-100" fill="currentColor" viewBox="0 0 24 24">
						<path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
					</svg>
				</button>
			</div>

			<div class="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
				<svg class="w-2.5 h-2.5 md:w-3 md:h-3 text-neutral-500" fill="currentColor" viewBox="0 0 24 24">
					<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
				</svg>
				<input
					type="range"
					min="0"
					max="1"
					step="0.1"
					value={volume}
					on:input={handleVolumeChange}
					class="w-12 md:w-16 h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer slider"
				/>
			</div>
		</div>
	</div>
</div>

<style>
	.slider::-webkit-slider-thumb {
		appearance: none;
		height: 12px;
		width: 12px;
		border-radius: 50%;
		background: #f5f5f5;
		cursor: pointer;
		border: 2px solid #404040;
	}

	.slider::-moz-range-thumb {
		height: 12px;
		width: 12px;
		border-radius: 50%;
		background: #f5f5f5;
		cursor: pointer;
		border: 2px solid #404040;
	}


</style>