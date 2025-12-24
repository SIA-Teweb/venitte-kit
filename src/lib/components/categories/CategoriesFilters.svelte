<script lang="ts">
	import { Check, Eraser, XIcon } from '@lucide/svelte';
	import Slider from '../ui/Slider.svelte';
	import { t } from '$lib/translations';
	import Button from '../ui/Button.svelte';
	import MultipleSelect from '../ui/MultipleSelect.svelte';
	import type { AvaliableFiltersResponse } from '$lib/types/categories';
	import FormItem from '../ui/FormItem.svelte';
	import { generateCategoriesUrl, parseCategoriesUrl } from '$lib/helpers/categories';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let {
		avaliableFilters,
		closeSidebar
	}: {
		avaliableFilters: Promise<AvaliableFiltersResponse>;
		closeSidebar: () => void;
	} = $props();

	const url = new URL(page.url);

	const { brands: extractedBrands, fromPrice, toPrice } = parseCategoriesUrl(url);

	let payload = $state({
		brands: extractedBrands ?? [],
		fromPrice: fromPrice,
		toPrice: toPrice,
		page: 1
	});

	function resetFilters(filters: AvaliableFiltersResponse) {
		console.log(filters);
		payload = {
			brands: [],
			fromPrice: filters.minPrice,
			toPrice: filters.maxPrice,
			page: 1
		};
		onAcceptFilters();
		closeSidebar?.();
	}

	function onAcceptFilters() {
		generateCategoriesUrl(url, payload);
		goto(url);
		closeSidebar?.();
	}
</script>

{#await avaliableFilters then filters}
	<FormItem label={$t('shop.brand')}>
		<MultipleSelect
			options={filters.brands.map((brand) => ({ label: brand.name, value: brand.id }))}
			bind:values={payload.brands}
			placeholder={$t('shop.choose')}
		/>
	</FormItem>
	<FormItem label={$t('shop.price')}>
		<Slider
			min={filters.minPrice}
			max={filters.maxPrice}
			bind:minValue={payload.fromPrice}
			bind:maxValue={payload.toPrice}
		/>
	</FormItem>
	<div class="mt-4 flex flex-col gap-2">
		<Button icon={Check} label={$t('common.accept')} onclick={onAcceptFilters} />
		<Button
			preset="tonal"
			icon={XIcon}
			label={$t('common.clearAll')}
			onclick={() => resetFilters(filters)}
		/>
	</div>
{/await}
