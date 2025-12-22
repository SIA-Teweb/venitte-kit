<script lang="ts">
	import ProductSection from '$lib/components/products/ProductSection.svelte';
	import { CreditCard, Package, ShieldCheck, ShieldUser } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { t } from '$lib/translations';

	let { data }: PageProps = $props();
</script>

<ProductSection
	title={$t('shop.newItems')}
	productsQuery={data.newProducts}
	expectedCount={6}
	noteIfEmpty={$t('shop.noitems')}
/>
<ProductSection
	title={$t('shop.specialOffers')}
	productsQuery={data.specialProducts}
	expectedCount={12}
	noteIfEmpty={$t('shop.noitems')}
/>

<div class="grid m-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
	<div class="flex gap-2 items-center">
		<ShieldCheck size={48} color="var(--color-tertiary-500)" />
		<span>{$t('shop.onlyOriginalGoods')}</span>
	</div>
	<div class="flex gap-2 items-center">
		<Package size={48} color="var(--color-tertiary-500)" />
		<span>{$t('shop.allEuDelivery')}</span>
	</div>
	<div class="flex gap-2 items-center">
		<CreditCard size={48} color="var(--color-tertiary-500)" />
		<span>{$t('shop.anyOnlinePayments')}</span>
	</div>
	<div class="flex gap-2 items-center">
		<ShieldUser size={48} color="var(--color-tertiary-500)" />
		<span>{$t('shop.buyWithoutRegistration')}</span>
	</div>
</div>
