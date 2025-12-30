<script lang="ts">
	import { formatDateShort, toMoney } from '$lib/helpers/strings';
	import { t } from '$lib/translations';
	import type { DeliveryResponse } from '$lib/types/orders';
	import { CreditCard, PackagePlus } from '@lucide/svelte';
	import Button from '../ui/Button.svelte';
	import CartSummaryRow from './CartSummaryRow.svelte';

	import AmexIcon from '$lib/assets/payment/amex.svg';
	import ApplePayIcon from '$lib/assets/payment/apple-pay.svg';
	import GooglePlayIcon from '$lib/assets/payment/google-pay.svg';
	import MasterCardIcon from '$lib/assets/payment/mastercard.svg';
	import PayPalIcon from '$lib/assets/payment/paypal.svg';
	import VisaIcon from '$lib/assets/payment/visa.svg';
	import { cartStore } from '$lib/stores/cart';
	import type { Variant } from '$lib/types/cart';
	import { formValues } from '$lib/stores/forms';
	import { queryPromoDiscount } from '$lib/helpers/cart';
	import { api } from '$lib/helpers/api';
	import { onMount } from 'svelte';
	import { createChangeDetector } from '$lib/helpers/stores';

	let {
		isFormOpen = $bindable(false),
		variants
	}: {
		isFormOpen: Boolean;
		variants: Variant[];
	} = $props();

	let promoDiscount: number = $state(0);
	let deliveryData: DeliveryResponse | undefined = $state(undefined);
	let locationChanged = createChangeDetector($formValues, ['country', 'postcode']);

	const paymentMethods = [
		AmexIcon,
		ApplePayIcon,
		GooglePlayIcon,
		MasterCardIcon,
		PayPalIcon,
		VisaIcon
	];

	let { totalPrice, totalDiscount } = $derived.by(() => {
		if (!variants.length) return { totalPrice: 0, totalDiscount: 0 };

		let total = 0;
		let discount = 0;

		$cartStore.forEach((cartItem) => {
			const product = variants.find((p) => p.id === cartItem.variantId);

			if (!product) return;

			const price = Number(product.versions[0].price);
			const specialPrice = Number(product.versions[0].specialPrice);
			const itemPrice = cartItem.amount * Number(price);

			total += itemPrice;

			if (specialPrice !== 0) {
				discount += cartItem.amount * (price - specialPrice);
			}
		});

		return { totalPrice: total, totalDiscount: discount + promoDiscount };
	});

	let totalToPay = $derived(totalPrice - totalDiscount + (deliveryData?.price ?? 0));

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

	function calculateDiscount() {
		if (!$formValues.promocode) return;

		queryPromoDiscount({
			postcode: $formValues.postcode,
			country: $formValues.country,
			deliveryType: $formValues.deliveryType,
			items: $cartStore,
			promocode: $formValues.promocode
		}).then((data) => {
			promoDiscount = data;
		});
	}

	$effect(() => {
		if (locationChanged($formValues)) {
			setDeliveryData();
		}
	});

	onMount(() => {
		setDeliveryData();
		calculateDiscount();
	});
</script>

<div class="flex flex-col preset-bordered-card gap-2 p-4">
	<CartSummaryRow
		class="[&_span]:last:font-bold"
		key={$t('common.products')}
		value={toMoney(totalPrice)}
	/>
	{#if totalDiscount > 0}
		<CartSummaryRow
			class="text-tertiary-600 [&_span]:last:font-bold"
			key={$t('common.discounts')}
			value={`- ${toMoney(totalDiscount)}`}
		/>
	{/if}
	{#if deliveryData}
		<CartSummaryRow
			class="[&_span]:last:font-bold"
			key={$t('shop.delivery')}
			value={deliveryData.price > 0 ? toMoney(deliveryData.price) : $t('common.free')}
		/>
	{/if}
	<hr class="hr" />
	<CartSummaryRow
		class="[&_span]:last:font-bold text-xl"
		key={$t('shop.total')}
		value={toMoney(totalToPay)}
	/>
	{#if deliveryData}
		<CartSummaryRow
			class="text-surface-500 text-sm"
			key={$t('shop.deliveryTime')}
			value={`${formatDateShort(deliveryData.from)} - ${formatDateShort(deliveryData.to)}`}
		/>
	{/if}
	<div class="mt-4 w-full">
		{#if isFormOpen}
			<Button
				type="submit"
				icon={CreditCard}
				label={`${$t('shop.pay')} ${toMoney(totalToPay)}`}
				onclick={() => {}}
				full
			/>
		{:else}
			<Button
				label={$t('shop.placeOrder')}
				icon={PackagePlus}
				onclick={() => {
					isFormOpen = true;
				}}
				full
			/>
		{/if}
		<div class="flex flex-wrap mt-4">
			{#each paymentMethods as paymentMethod}
				<img
					class="h-[50px] aspect-video object-contain flex-3"
					src={paymentMethod}
					alt="Payment method"
				/>
			{/each}
		</div>
	</div>
</div>
