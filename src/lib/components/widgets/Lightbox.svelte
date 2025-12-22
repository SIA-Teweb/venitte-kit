<script lang="ts">
	import { XIcon, ChevronRight, ChevronLeft } from '@lucide/svelte';
	import { cubicIn } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';
	import Button from '$lib/components/ui/Button.svelte';
	import Image from '$lib/components/ui/Image.svelte';
	import { onMount } from 'svelte';

	let { images, index, close } = $props();

	let container: HTMLElement | undefined = undefined;
	let currentIntdex = $derived(index);

	function scrollToIndex(isInitial = false) {
		if (!container) return;

		container.scrollTo({
			left: currentIntdex * container.clientWidth,
			behavior: isInitial ? 'instant' : 'smooth'
		});
	}

	onMount(() => {
		if (!container) return;

		const ro = new ResizeObserver(() => {
			if (container && container.clientWidth > 0) {
				scrollToIndex(true);
				ro.disconnect();
			}
		});

		ro.observe(container);
		return () => ro.disconnect();
	});

	$effect(() => {
		if (currentIntdex !== undefined && container) scrollToIndex();
	});
</script>

<div
	class="fixed flex justify-center items-center inset-0 z-50 bg-surface-50/50 backdrop-blur-xs"
	transition:fade={{ duration: 200, easing: cubicIn }}
>
	<Button icon={XIcon} class="fixed top-5 right-5" preset="tonal" onclick={close} />
	<button
		class="hidden md:block w-1/5 h-full max-h-[90dvh]"
		onclick={() => currentIntdex--}
		disabled={currentIntdex <= 0}
	>
		<ChevronLeft size={32} />
	</button>
	<div
		class="max-w-full md:max-w-3/5 max-h-[90dvh] snap-x snap-mandatory overflow-scroll flex aspect-square no-scrollbar"
		in:scale={{ duration: 200 }}
		bind:this={container}
	>
		{#each images as image}
			<div class="flex-none w-full snap-center">
				<Image src={image.main} alt="hello" clases="object-contain flex-none" />
			</div>
		{/each}
	</div>
	<button
		class="hidden md:flex w-1/5 h-full max-h-[90dvh] items-center justify-end"
		onclick={() => currentIntdex++}
		disabled={currentIntdex >= images.length - 1}
	>
		<ChevronRight size={32} />
	</button>
</div>
