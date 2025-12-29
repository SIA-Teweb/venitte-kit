<script lang="ts">
	import { ImageSizeEnum } from '$lib/enums/images';
	import { createLightbox } from '$lib/helpers/lightbox';
	import type { ProductSingle } from '$lib/types/products';
	import Image from '../ui/Image.svelte';

	let { product }: { product: ProductSingle } = $props();

	const { images } = $derived(product);

	let galleryElement: HTMLElement;
	let activeIndex: number = $state(0);

	function onScrollToImage(i: number) {
		if (!galleryElement) return;
		activeIndex = i;
		galleryElement.scrollTo({
			left: i * galleryElement.clientWidth,
			behavior: 'smooth'
		});
	}

	function handleScroll() {
		if (!galleryElement) return;
		activeIndex = Math.round(galleryElement.scrollLeft / galleryElement.clientWidth);
	}
</script>

<div class="flex gap-2 -mx-4 -mt-10 md:m-0">
	<div class="hidden md:flex flex-col gap-2 max-w-[100px] w-full flex-none">
		{#each images as image, i}
			{@const thumbnail = image.thumbnails.find((thumb) => thumb.size === ImageSizeEnum.s240)?.link}

			<button onclick={() => onScrollToImage(i)}>
				<Image
					clases="aspect-square object-contain"
					src={thumbnail}
					alt={`${product.brand} ${product.model}`}
				/>
			</button>
		{/each}
	</div>
	<div class="relative aspect-square shrink min-w-0 w-full">
		<div
			class="snap-x snap-mandatory overflow-scroll flex aspect-square no-scrollbar"
			bind:this={galleryElement}
			onscroll={handleScroll}
		>
			{#each images as image, index}
				{@const thumbnail = image.thumbnails.find(
					(thumb) => thumb.size === ImageSizeEnum.s720
				)?.link}

				<button
					class="flex-none w-full snap-center"
					onclick={() => createLightbox({ images, index })}
				>
					<Image
						clases="aspect-square object-contain"
						src={thumbnail}
						alt={`${product.brand} ${product.model}`}
					/>
				</button>
			{/each}
		</div>
		{#if images.length > 1}
			<div class="absolute bottom-3 w-full flex items-center justify-center gap-2 py-2">
				{#each images as _, index}
					<button
						type="button"
						onclick={() => onScrollToImage(index)}
						class="h-2 shadow w-2 rounded-full transition-all duration-300 {index === activeIndex
							? 'w-6 bg-tertiary-500/90'
							: 'bg-surface-300/50'}"
						aria-label="Go to slide {index + 1}"
					></button>
				{/each}
			</div>
		{/if}
	</div>
</div>
