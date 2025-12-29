<script lang="ts">
	import type { ProductSingle } from '$lib/types/products';
	import ProductSingleDetails from './ProductSingleDetails.svelte';
	import ProductSingleGallery from './ProductSingleGallery.svelte';

	let { product }: { product: ProductSingle } = $props();
</script>

<div class="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-6 items-start">
	<ProductSingleGallery {product} />
	<ProductSingleDetails {product} />
</div>
