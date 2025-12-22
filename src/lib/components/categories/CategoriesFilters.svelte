<script lang="ts">
	import { Check, XIcon } from '@lucide/svelte';
	import Slider from '../ui/Slider.svelte';
	import { t } from '$lib/translations';
	import Button from '../ui/Button.svelte';
	import MultipleSelect from '../ui/MultipleSelect.svelte';
	import type { AvaliableFiltersResponse } from '$lib/types/categories';
	import FormItem from '../ui/FormItem.svelte';

	let {
		avaliableFilters,
		closeSidebar
	}: {
		avaliableFilters: Promise<AvaliableFiltersResponse>;
		closeSidebar: () => void;
	} = $props();

	let brands = $state([]);
	let minPrice = $state();
	let maxPrice = $state();

	$effect(() => {
		avaliableFilters.then((filters) => {
			console.log(filters);
		});
		console.log(brands);
	});
</script>

{#await avaliableFilters then filters}
	<FormItem label={$t('shop.brand')}>
		<MultipleSelect
			options={filters.brands.map((brand) => ({ label: brand.name, value: brand.id }))}
			bind:values={brands}
			placeholder={$t('shop.choose')}
		/>
	</FormItem>
	<FormItem label={$t('shop.price')}>
		<Slider min={filters.minPrice} max={filters.maxPrice} minValue={minPrice} maxValue={maxPrice} />
	</FormItem>
	<div class="mt-4 flex flex-col gap-2">
		<Button icon={Check} label={$t('common.accept')} />
		<Button preset="tonal" icon={XIcon} label={$t('common.cancel')} onclick={closeSidebar} />
	</div>
{/await}
