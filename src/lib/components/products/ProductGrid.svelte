<script lang="ts">
	import type { Product } from '$lib/types/products';
	import ProductCard from './ProductCard.svelte';

	let { products }: { products?: Product[] } = $props();
</script>

<div class="grid md:grid-cols-3 lg:grid-cols-6 grid-cols-2 gap-2 md:gap-4">
	{#each products as product}
		<ProductCard {product} />
	{/each}
</div>
