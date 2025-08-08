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

<div class="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform md:right-2 md:top-6 md:left-auto md:bottom-auto md:translate-x-0">
	<div
		class="relative rounded-lg border border-neutral-700 bg-neutral-900/95 px-3 py-2 shadow-lg backdrop-blur-md md:px-4 md:py-3"
	>
		<div class="flex items-center gap-2 md:gap-3">
			<div class="hidden min-w-0 sm:flex sm:flex-col">
				<div class="truncate text-xs font-medium text-neutral-200">{currentTrack.title}</div>
				<div class="truncate text-xs text-neutral-500">Ambient Music</div>
			</div>

			<div class="flex flex-shrink-0 items-center gap-1.5 md:gap-2">
				<button
					on:click={togglePlayPause}
					class="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 transition-colors hover:bg-neutral-700 md:h-7 md:w-7"
				>
					{#if isPlaying}
						<svg
							class="h-2.5 w-2.5 text-neutral-100 md:h-3 md:w-3"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M6 4h4v16H6zM14 4h4v16h-4z" />
						</svg>
					{:else}
						<svg
							class="ml-0.5 h-2.5 w-2.5 text-neutral-100 md:h-3 md:w-3"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M8 5v14l11-7z" />
						</svg>
					{/if}
				</button>

				<button
					on:click={nextTrack}
					class="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 transition-colors hover:bg-neutral-700 md:h-6 md:w-6"
				>
					<svg
						class="h-2.5 w-2.5 text-neutral-100 md:h-3 md:w-3"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
					</svg>
				</button>
			</div>

			<div class="flex flex-shrink-0 items-center gap-1.5 md:gap-2">
				<svg
					class="h-2.5 w-2.5 text-neutral-500 md:h-3 md:w-3"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"
					/>
				</svg>
				<input
					type="range"
					min="0"
					max="1"
					step="0.1"
					value={volume}
					on:input={handleVolumeChange}
					class="slider h-1 w-12 cursor-pointer appearance-none rounded-lg bg-neutral-700 md:w-16"
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
