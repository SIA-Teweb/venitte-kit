<script lang="ts">
	import { locale, t } from '$lib/translations';
	import type { ProductSingle } from '$lib/types/products';
	import ProductPrice from './ProductPrice.svelte';
	import ProductSingleControls from './ProductSingleControls.svelte';

	let { product }: { product: ProductSingle } = $props();

	let priceObject = $derived({
		price: product.price,
		maxPrice: product.maxPrice,
		minPrice: product.minPrice,
		specialPrice: product.specialPrice
	});
</script>

<div class="flex flex-col gap-2">
	<h1>
		<span class="text-lg font-bold">{product.brand}</span>
		<span class="text-lg">{product.model}</span>
	</h1>
	<div class="flex gap-2 items-center">
		<span class="text-lg">{$t('shop.price')}: </span>
		<ProductPrice {priceObject} isShort={false} />
	</div>
	<ProductSingleControls {product} bind:priceObject />
	{@html product.description[$locale]}
</div>
