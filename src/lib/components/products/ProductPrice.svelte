<script lang="ts">
	import { toMoney } from '$lib/helpers/strings';
	import { t } from '$lib/translations';
	import type { PriceObjectProps } from '$lib/types/products';

	let {
		priceObject,
		isShort = true
	}: {
		priceObject: PriceObjectProps;
		isShort?: boolean;
	} = $props();

	let { minPrice, maxPrice, specialPrice, price } = $derived(priceObject);
</script>

<div class="flex gap-2 items-baseline">
	{#if minPrice === maxPrice}
		{#if specialPrice}
			<span class="font-medium text-base text-red-600 leading-none">
				{toMoney(specialPrice)}
			</span>
		{/if}
		<span class="{specialPrice ? 'line-through' : ''} font-semibold text-base leading-none">
			{toMoney(price)}
		</span>
	{:else if isShort}
		<span class="leading-none">{$t('common.from')}</span>
		<span class="font-semibold text-base leading-none">{toMoney(Number(minPrice))}</span>
	{:else}
		<span class="font-medium text-lg leading-none">{$t('common.from')}</span>
		<span class="font-semibold text-lg leading-none">{toMoney(Number(minPrice))}</span>
		<span class="font-medium text-lg leading-none">{$t('common.to').toLowerCase()}</span>
		<span class="font-semibold text-lg leading-none">{toMoney(Number(maxPrice))}</span>
	{/if}
</div>
