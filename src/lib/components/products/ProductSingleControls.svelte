<script lang="ts">
	import { locale, t } from '$lib/translations';
	import { Package, Share2, ShoppingBasket, Van } from '@lucide/svelte';
	import Button from '../ui/Button.svelte';
	import Badge from '../ui/Badge.svelte';
	import type { PriceObjectProps, ProductSingle, ProductVariant } from '$lib/types/products';
	import ProductWishListButton from './ProductWishListButton.svelte';
	import { addToCart } from '$lib/helpers/cart';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import Selector from '../ui/Selector.svelte';
	import FormItem from '../ui/FormItem.svelte';
	import type { SelectOption } from '$lib/types/ui';
	import { goto } from '$app/navigation';
	import ShareLinkButtons from '../widgets/ShareLinkButtons.svelte';
	import { isMobileScreen } from '$lib/helpers/layout';
	import { createDialog } from '$lib/stores/dialogs';
	import { openPopover } from '$lib/helpers/popover';
	import ProductSingleControlsDelivery from './ProductSingleControlsDelivery.svelte';

	// #region Variables

	let {
		product,
		priceObject = $bindable()
	}: { product: ProductSingle; priceObject: PriceObjectProps } = $props();

	let variants: ProductVariant[] = $derived(
		product.variants.filter((variant) => variant.amount > 0)
	);
	let sortedVariants: ProductVariant[];
	let chosenVariation: ProductVariant | undefined = $state(undefined);
	let chosenValues: { [optionId: number]: string | number | undefined } =
		$state(constructChosenValues());
	let optionsValues: { [optionId: number]: SelectOption[] } = $derived(constructOptionsValues());
	let totalStock = $state(0);
	const initialTotalStock = $derived(
		product.variants.reduce((total, variation) => total + variation.amount, 0)
	);
	let url = page.url;
	let shareBoxAnchor: HTMLElement;

	// #region Functions

	function setInitialVariant() {
		if (product.variants.length === 1) {
			chosenVariation = product.variants[0];
			return;
		}

		const urlVariant = url.searchParams.get('variant');

		if (urlVariant) {
			chosenVariation = product.variants.find((variant) => variant.id === Number(urlVariant));
		}

		if (chosenVariation) {
			chosenVariation.options.forEach((option) => {
				chosenValues[option.attributeId] = option.valueId;
			});
		}
	}

	function constructChosenValues() {
		return Object.fromEntries(product.options.map((option) => [option.id, undefined]));
	}

	function constructOptionsValues() {
		const isDefined = <T,>(value: T | undefined | null): value is T => value != null;

		return Object.fromEntries(
			product.options.map(
				(option) =>
					[
						option.id,
						variants
							.flatMap((v) => v.options)
							.map((vo) => option.values.find((ov) => ov.id === vo.valueId))
							.map((v) =>
								v?.id && v.value
									? {
											label: String(v.value),
											value: v.id
											// disabled:
										}
									: undefined
							)
							.filter(isDefined)
					] as const
			)
		) as Record<number, SelectOption[]>;
	}

	function sortVariants() {
		sortedVariants = variants.filter((variant) =>
			variant.options.some((option) => option.valueId === chosenValues[option.attributeId])
		);

		if (sortedVariants.length === 1) {
			chosenVariation = sortedVariants[0];
		}
	}

	function openSharingBox(event: Event) {
		const target = event.target as HTMLElement;
		if (isMobileScreen()) {
			createDialog({
				title: $t('common.shareThis'),
				content: {
					component: ShareLinkButtons
				}
			});
		} else {
			openPopover({
				target: shareBoxAnchor,
				content: {
					component: ShareLinkButtons
				}
			});
		}
	}

	// #region Lifecycle

	$effect(() => {
		if (chosenVariation) {
			priceObject = {
				maxPrice: 0,
				minPrice: 0,
				price: chosenVariation.price,
				specialPrice: chosenVariation.specialPrice
			};
			totalStock = chosenVariation.amount;
			url.searchParams.set('variant', String(chosenVariation.id));
			goto(url, { replaceState: true });
		} else {
			totalStock = initialTotalStock;
		}
	});

	onMount(() => {
		setInitialVariant();
		if (chosenVariation) {
			chosenVariation.options.forEach((variantOption) => {
				chosenValues[variantOption.attributeId] = variantOption.valueId;
			});
		}
	});
</script>

<div class="flex flex-col border border-surface-200 rounded-2xl gap-4 p-4">
	{#each product.options as option}
		<FormItem label={option.name[$locale]}>
			<Selector
				options={optionsValues[option.id]}
				suffix={option.measurementUnit[$locale]}
				bind:value={chosenValues[option.id]}
				onchange={sortVariants}
			/>
		</FormItem>
	{/each}
	<div class="flex gap-2 flex-wrap sm:flex-nowrap" bind:this={shareBoxAnchor}>
		<ProductWishListButton id={product.id} />
		<Button class="relative" icon={Share2} preset="tonal" onclick={openSharingBox} />
		<Button
			label={$t('shop.addToCart')}
			icon={ShoppingBasket}
			onclick={() => (chosenVariation ? addToCart(chosenVariation?.id) : {})}
			full
		/>
	</div>
</div>
<div class="flex flex-wrap gap-2">
	<ProductSingleControlsDelivery {chosenVariation} />
	<Badge preset={totalStock < 5 ? 'warning' : 'tonal'} icon={Package}>
		{$t('shop.inStock')}
		{totalStock < 5 ? totalStock : '>5'}
		{$t('common.pcs')}
	</Badge>
	{#if chosenVariation && chosenVariation.ean}
		<Badge preset="tonal">
			EAN: ${chosenVariation.ean}
		</Badge>
	{/if}
</div>
