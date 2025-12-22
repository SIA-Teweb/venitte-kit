<script lang="ts">
	import Section from '../ui/Section.svelte';
	import ProductGrid from './ProductGrid.svelte';
	import SkeletonProductGrid from './SkeletonProductGrid.svelte';

	let {
		title,
		controls = undefined,
		subtitle = undefined,
		productsQuery,
		expectedCount,
		noteIfEmpty
	} = $props();
</script>

<Section {title} {subtitle} {controls}>
	{#await productsQuery}
		<SkeletonProductGrid count={expectedCount} />
	{:then data}
		{#if data.products && data.products.length > 0}
			<ProductGrid products={data.products} />
		{:else}
			<span>{noteIfEmpty}</span>
		{/if}
	{/await}
</Section>
