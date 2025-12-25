<script lang="ts">
	import { formValues } from '$lib/stores/forms';
	import { t } from '$lib/translations';
	import { Van } from '@lucide/svelte';
	import countries from '$lib/constants/countries.json';
	import { api } from '$lib/helpers/api';
	import { formatDateShort } from '$lib/helpers/strings';
	import type { DeliveryResponse } from '$lib/types/orders';
	import { isMobileScreen } from '$lib/helpers/layout';
	import { openPopover } from '$lib/helpers/popover';
	import ProductDeliveryChangeForm from './ProductDeliveryChangeForm.svelte';
	import { createDialog } from '$lib/stores/dialogs';
	import Badge from '../ui/Badge.svelte';

	let { chosenVariation } = $props();
	let deliveryData: DeliveryResponse | undefined = $state();
	let countryLabel: string | undefined = $state(undefined);

	function openDeliveryChangeForm(event: Event) {
		if (!isMobileScreen()) {
			openPopover({
				target: event.currentTarget as HTMLElement,
				content: {
					component: ProductDeliveryChangeForm
				}
			});
		} else {
			createDialog({
				title: $t('common.deliveryDetails'),
				content: {
					component: ProductDeliveryChangeForm
				}
			});
		}
	}

	$effect(() => {
		if ($formValues && $formValues.country !== undefined) {
			countryLabel = countries.find((country) => country.iso === $formValues.country)?.label;
		}
		if (chosenVariation) {
			api.orders
				.getDeliveryData({
					deliveryType: '',
					country: $formValues.country,
					postcode: $formValues.postcode,
					items: [{ variantId: chosenVariation.id, amount: 1 }]
				})
				.then((data) => {
					deliveryData = data;
				});
		}
	});
</script>

<Badge class="relative" onclick={openDeliveryChangeForm}>
	<Van />
	{#if $formValues && $formValues.country}
		{$t('shop.deliveryTime')} ({$t(`common.countries.${countryLabel}`)}):
	{:else}
		{$t('shop.enterAddress')}
	{/if}
	{#if !chosenVariation}
		{$t('common.chooseOption')}
	{/if}
	{#if deliveryData}
		{formatDateShort(deliveryData.from)} - {formatDateShort(deliveryData.to)}
	{/if}
</Badge>
