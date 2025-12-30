<script lang="ts">
	import ProductSingle from '$lib/components/products/ProductSingle.svelte';
	import SkeletonProductSingle from '$lib/components/products/SkeletonProductSingle.svelte';
	import { formValues } from '$lib/stores/forms';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import { locale } from '$lib/translations';
	import SEO from '$lib/components/widgets/SEO.svelte';

	let { data }: PageProps = $props();

	onMount(() => {
		if (!$formValues.country) $formValues.country = data.location.country;
		if (!$formValues.postcode) $formValues.postcode = data.location.randomPostcode;
	});
</script>

{#await data.product}
	<SkeletonProductSingle />
{:then product}
	<SEO title={`${product.brand} ${product.model}`} description={product.description[$locale]} />
	<ProductSingle {product} />
{/await}
