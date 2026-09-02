import { onMount } from 'svelte';

let audioContext: AudioContext;
let audioBuffer: AudioBuffer;
let lastSoundTime = 0;

export async function initAudio(soundPath: string): Promise<boolean> {
	try {
		if (!soundPath) return false;

		audioContext = new (window.AudioContext || window.webkitAudioContext)();

		const response = await fetch(soundPath);
		const arrayBuffer = await response.arrayBuffer();
		audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

		return true;
	} catch (error) {
		console.error('Error initializing audio:', error);
		return false;
	}
}

export function playSound(throttleMilliseconds: number = 30, volume: number = 0.3): void {
	if (!audioContext || !audioBuffer) return;

	const now = Date.now();
	if (now - lastSoundTime > throttleMilliseconds) {
		try {
			const source = audioContext.createBufferSource();
			source.buffer = audioBuffer;

			const gainNode = audioContext.createGain();
			gainNode.gain.value = volume;

			source.connect(gainNode);
			gainNode.connect(audioContext.destination);

			source.start(0);
			lastSoundTime = now;
		} catch (error) {
			console.error('Error playing sound:', error);
		}
	}
}

export function useSoundEffect(soundPath: string = ''): {
	playSound: (throttleMilliseconds?: number, volume?: number) => void;
} {
	onMount(() => {
		initAudio(soundPath);
	});

	return { playSound };
}
