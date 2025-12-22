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

	let {
		onClick,
		isFormOpen = $bindable(false),
		totalPrice,
		totalDiscount,
		deliveryData
	}: {
		onClick: () => void;
		isFormOpen: Boolean;
		totalPrice: number;
		totalDiscount: number;
		deliveryData?: DeliveryResponse;
	} = $props();

	let totalToPay = $derived(totalPrice - totalDiscount + (deliveryData?.price ?? 0));

	const paymentMethods = [
		AmexIcon,
		ApplePayIcon,
		GooglePlayIcon,
		MasterCardIcon,
		PayPalIcon,
		VisaIcon
	];
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
			value={toMoney(deliveryData.price)}
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
