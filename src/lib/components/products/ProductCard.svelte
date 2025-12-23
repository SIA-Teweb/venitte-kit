<script lang="ts">
	import { goto } from '$app/navigation';
	import { route, ROUTES } from '$lib/constants/routes';
	import { ImageSizeEnum } from '$lib/enums/images';
	import { locale } from '$lib/translations';
	import type { Product } from '$lib/types/products';
	import Image from '../ui/Image.svelte';
	import ProductPrice from './ProductPrice.svelte';

	let { product }: { product: Product } = $props();

	let { brand, model, image, minPrice, maxPrice, specialPrice, price, link } = $derived(product);

	const thumbLink = $derived(
		image.thumbnails.find((thumb) => thumb.size === ImageSizeEnum.s480)?.link
	);
</script>

<button
	class="flex flex-col gap-2 p-2 transform transition-transform duration-200 hover:scale-110 text-left"
	onclick={() => goto(route(ROUTES.PRODUCT, $locale) + '/' + link)}
>
	<Image src={thumbLink} alt={`${brand} ${model}`} clases="object-contain w-full aspect-square" />
	<div class="flex flex-col">
		<span class="font-bold">{brand}</span>
		<span class="text-sm line-clamp-2 leading-5 h-10">{model}</span>
	</div>
	<ProductPrice priceObject={{ minPrice, maxPrice, specialPrice, price }} />
</button>
