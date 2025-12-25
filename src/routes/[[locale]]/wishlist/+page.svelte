<script lang="ts">
	import ProductSection from '$lib/components/products/ProductSection.svelte';
	import { wishListStore } from '$lib/stores/wishList';
	import { t } from '$lib/translations';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ProductSection
	title={$t('common.wishList')}
	expectedCount={6}
	productsQuery={$wishListStore && data.wishListPromise ? data.wishListPromise : []}
	noteIfEmpty={$t('shop.isEmpty')}
/>
