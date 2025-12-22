<script lang="ts">
	import { ImageSizeEnum } from '$lib/enums/images';
	import { createLightbox } from '$lib/helpers/lightbox';
	import type { ProductSingle } from '$lib/types/products';
	import Image from '../ui/Image.svelte';

	let { product }: { product: ProductSingle } = $props();

	const { images } = $derived(product);

	let galleryElement: HTMLElement;

	function onScrollToImage(i: number) {
		if (!galleryElement) return;

		galleryElement.scrollTo({
			left: i * galleryElement.clientWidth,
			behavior: 'smooth'
		});
	}
</script>

<div class="flex gap-2 -mx-4 md:mx-0">
	<div class="hidden md:flex flex-col gap-2 w-[100px]">
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
	<div
		class="w-full snap-x snap-mandatory overflow-scroll flex aspect-square no-scrollbar"
		bind:this={galleryElement}
	>
		{#each images as image, index}
			{@const thumbnail = image.thumbnails.find((thumb) => thumb.size === ImageSizeEnum.s720)?.link}

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
</div>
