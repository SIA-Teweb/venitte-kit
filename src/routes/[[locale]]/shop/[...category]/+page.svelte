<script lang="ts">
	import { goto } from '$app/navigation';
	import ProductSection from '$lib/components/products/ProductSection.svelte';
	import Paginator from '$lib/components/ui/Paginator.svelte';
	import { PRODUCTS_PAGE_SIZE } from '$lib/constants/other';
	import { locale, t } from '$lib/translations';
	import type { PageProps } from './$types';
	import Button from '$lib/components/ui/Button.svelte';
	import CategoriesBreadCrumbs from '$lib/components/categories/CategoriesBreadCrumbs.svelte';
	import { SlidersHorizontal } from '@lucide/svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import { sidebarStore } from '$lib/stores/sidebar';
	import CategoriesFilters from '$lib/components/categories/CategoriesFilters.svelte';
	import { page } from '$app/state';
	import { generateCategoriesUrl, parseCategoriesUrlKey } from '$lib/helpers/categories';
	import { onDestroy } from 'svelte';
	import { lastShopLinkStore } from '$lib/stores/navigation';
	import { isMobileScreen } from '$lib/helpers/layout';
	import { createDialog } from '$lib/stores/dialogs';

	let { data }: PageProps = $props();

	const url = $derived(new URL(page.url));
	let currentPage: number = $derived((parseCategoriesUrlKey(url, 'page') as number) ?? 1);
	const sortOptions = $derived([
		{ value: 'createdAt.desc', label: $t('common.newFirst') },
		{ value: 'createdAt.asc', label: $t('common.oldFirst') },
		{ value: 'price.asc', label: $t('common.cheapFirst') },
		{ value: 'price.desc', label: $t('common.expensiveFirst') }
	]);

	let sortValue: string = $derived.by(() => {
		const sortUrlString = url.searchParams.get('sort');
		return sortUrlString ? JSON.parse(sortUrlString) : sortOptions[0].value;
	});

	function changePage(newPage: number) {
		currentPage = newPage;
		generateCategoriesUrl(url, { page: newPage });
		goto(url, { replaceState: true });
	}

	function changeOrder(value: string | number) {
		generateCategoriesUrl(url, { sort: value, page: 1 });
		goto(url, { replaceState: true });
	}

	function openCategoriesFilters() {
		if (isMobileScreen()) {
			createDialog({
				title: $t('common.filtrs'),
				content: {
					component: CategoriesFilters,
					props: {
						avaliableFilters: data.avaliableFilters
					}
				}
			});
		} else {
			sidebarStore.open({
				id: 'category-filters',
				title: $t('common.filtrs'),
				side: 'right',
				content: {
					component: CategoriesFilters,
					props: {
						avaliableFilters: data.avaliableFilters
					}
				}
			});
		}
	}

	onDestroy(() => {
		lastShopLinkStore.set(url);
	});
</script>

<ProductSection
	title={data.current?.name[$locale]}
	expectedCount={PRODUCTS_PAGE_SIZE}
	productsQuery={data.products}
	noteIfEmpty={$t('shop.noitems')}
>
	{#snippet subtitle()}
		<CategoriesBreadCrumbs categories={data.trail} />
	{/snippet}
	{#snippet controls()}
		<div class="grid grid-cols-[1fr_1fr] w-full sm:flex sm:w-auto gap-2">
			<Select options={sortOptions} value={sortValue} onchange={changeOrder} />
			<Button
				preset="tonal"
				icon={SlidersHorizontal}
				label={$t('common.filtrs')}
				onclick={openCategoriesFilters}
				disabled={!data.avaliableFilters}
			/>
		</div>
	{/snippet}
</ProductSection>

{#await data.products then products}
	{#if products.total > PRODUCTS_PAGE_SIZE}
		<div class="self-center">
			<Paginator
				page={currentPage}
				pageSize={PRODUCTS_PAGE_SIZE}
				totalCount={products.total}
				onchange={changePage}
			/>
		</div>
	{/if}
{/await}
