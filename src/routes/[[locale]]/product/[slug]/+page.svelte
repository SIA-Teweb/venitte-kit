<script lang="ts">
	import ProductSingle from '$lib/components/products/ProductSingle.svelte';
	import SkeletonProductSingle from '$lib/components/products/SkeletonProductSingle.svelte';
	import { formValues } from '$lib/stores/forms';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	onMount(() => {
		if (!$formValues.country) $formValues.country = data.location.country;
		if (!$formValues.postcode) $formValues.postcode = data.location.randomPostcode;
	});
</script>

{#await data.product}
	<SkeletonProductSingle />
{:then product}
	<ProductSingle {product} />
{/await}
