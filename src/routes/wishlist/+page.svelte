<script lang="ts">
	import ProductSection from '$lib/components/products/ProductSection.svelte';
	import { api } from '$lib/helpers/api';
	import { wishListStore } from '$lib/stores/wishList';
	import { t } from '$lib/translations';
	import { onMount } from 'svelte';
</script>

<ProductSection
	title={$t('common.wishList')}
	expectedCount={6}
	productsQuery={$wishListStore.length > 0 ? api.products.getByIds($wishListStore) : []}
	noteIfEmpty={$t('shop.isEmpty')}
/>
