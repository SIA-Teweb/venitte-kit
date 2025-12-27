<script lang="ts">
	import { browser } from '$app/environment';
	import CartForm from '$lib/components/cart/CartForm.svelte';
	import CartProductsList from '$lib/components/cart/CartProductsList.svelte';
	import CartSummary from '$lib/components/cart/CartSummary.svelte';
	import SkeletonCartProductsList from '$lib/components/cart/SkeletonCartProductsList.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { api } from '$lib/helpers/api';
	import { cartStore } from '$lib/stores/cart';
	import { createOrderForm, formValues } from '$lib/stores/forms';
	import { t } from '$lib/translations';
	import type { Variant } from '$lib/types/cart';
	import type { DeliveryResponse } from '$lib/types/orders';
	import { onMount, untrack } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let deliveryData: undefined | DeliveryResponse = $state(undefined);
	let isFormOpen = $state(false);
	let loadedVariants: Variant[] = $state([]);

	const orderForm = createOrderForm();
	const { form, createSubmitHandler, errors, data: orderFormData } = orderForm;

	let { totalPrice, totalDiscount } = $derived.by(() => {
		if (!loadedVariants.length) return { totalPrice: 0, totalDiscount: 0 };

		let total = 0;
		let discount = 0;

		$cartStore.forEach((cartItem) => {
			const product = loadedVariants.find((p) => p.id === cartItem.variantId);

			if (!product) return;

			const price = Number(product.versions[0].price);
			const specialPrice = Number(product.versions[0].specialPrice);
			const itemPrice = cartItem.amount * Number(price);

			total += itemPrice;

			if (specialPrice !== 0) {
				discount += cartItem.amount * (price - specialPrice);
			}
		});

		return { totalPrice: total, totalDiscount: discount };
	});

	function setDeliveryData() {
		if (!$formValues.country || !$formValues.postcode) {
			deliveryData = undefined;
			return;
		}

		api.orders
			.getDeliveryData({
				country: $formValues.country,
				deliveryType: '',
				postcode: $formValues.postcode,
				items: $cartStore
			})
			.then((data) => {
				deliveryData = data;
			});
	}

	$effect(() => {
		data.variantsPromise?.then((variants) => {
			loadedVariants = variants;
		});
	});

	onMount(() => {
		setDeliveryData();
	});
</script>

<Section title={$t('common.cart')}>
	{#if $cartStore && $cartStore.length > 0 && data.variantsPromise}
		<form use:form class="grid grid-cols-1 md:grid-cols-[5fr_2fr] items-start gap-6">
			<div class="flex flex-col gap-10">
				{#await data.variantsPromise}
					<SkeletonCartProductsList itemsCount={$cartStore.length} />
				{:then variantsResponse}
					<CartProductsList variants={variantsResponse} />
				{/await}
				{#if isFormOpen && orderForm}
					<CartForm {orderForm} onAddressChange={setDeliveryData} />
				{/if}
			</div>
			<div>
				<CartSummary
					{totalPrice}
					{totalDiscount}
					{deliveryData}
					onClick={createSubmitHandler()}
					bind:isFormOpen
				/>
			</div>
		</form>
	{:else}
		<span>{$t('shop.yourCartEmpty')}</span>
	{/if}
</Section>
