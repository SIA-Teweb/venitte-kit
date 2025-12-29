<script lang="ts">
	import { t } from '$lib/translations';
	import FormItem from '../ui/FormItem.svelte';
	import Input from '../ui/Input.svelte';
	import Section from '../ui/Section.svelte';
	import countries from '$lib/constants/countries.json';
	import { Steps } from '@skeletonlabs/skeleton-svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import Button from '../ui/Button.svelte';
	import TextArea from '../ui/TextArea.svelte';
	import Checkbox from '../ui/Checkbox.svelte';
	import { isMobileScreen } from '$lib/helpers/layout';
	import { formValues } from '$lib/stores/forms';
	import InputPhone from '../ui/InputPhone.svelte';
	import NewSelect from '../ui/NewSelect.svelte';
	import { cartStore } from '$lib/stores/cart';
	import { api } from '$lib/helpers/api';
	import type { DeliveryTypesResponse } from '$lib/types/orders';
	import { onMount } from 'svelte';
	import Selector from '../ui/Selector.svelte';
	import { toMoney } from '$lib/helpers/strings';
	import type { SelectOption } from '$lib/types/ui';

	let { orderForm } = $props();
	const { errors } = $derived(orderForm);

	const steps = [
		{ title: $t('shop.contactData') },
		{ title: $t('shop.delivery') },
		{ title: $t('shop.additional') }
	];

	let deliveryTypes: DeliveryTypesResponse = $state([]);
	let destinationsList: SelectOption[] = $state([]);

	function getDeliveryOptions() {
		if (!$formValues.country) return;

		api.orders
			.getDeliveryTypes({
				country: $formValues.country,
				items: $cartStore
			})
			.then((data) => {
				deliveryTypes = data;
			});
	}

	$effect(() => {
		if (deliveryTypes && $formValues.deliveryType) {
			destinationsList = [];

			const currentDeliveryType = deliveryTypes.find(
				(type) => type.key === $formValues.deliveryType
			);

			if (!currentDeliveryType) return;

			destinationsList = currentDeliveryType.destinations.map((destination, i) => ({
				label: destination.name,
				value: destination.name
			}));
		}
	});

	onMount(() => {
		getDeliveryOptions();
	});
</script>

<Section title={$t('shop.placeOrder')} class="preset-bordered-card p-4 block">
	<Steps
		orientation={isMobileScreen() ? 'horizontal' : 'vertical'}
		count={steps.length - 1}
		class="w-full gap-4 md:gap-16 md:p-4"
	>
		<Steps.List>
			{#each steps as item, index}
				<Steps.Item {index} class="">
					<Steps.Trigger
						class="flex gap-4 flex-col md:flex-row text-xs data-[state=active]:bg-red-500"
					>
						<Steps.Indicator>{index + 1}</Steps.Indicator>
						{item.title}
					</Steps.Trigger>
					{#if index < steps.length - 1}
						<Steps.Separator />
					{/if}
				</Steps.Item>
			{/each}
		</Steps.List>
		<div class="flex flex-col grow">
			{#each steps as item, index}
				<Steps.Content {index} class="flex flex-col gap-4">
					{#if index === 0}
						<h2>{item.title}</h2>
						<FormItem label={$t('common.name')} errors={$errors.firstname}>
							<Input
								name="firstname"
								autocomplete="given-name"
								bind:value={$formValues.firstname}
								placeholder="Jānis"
							/>
						</FormItem>
						<FormItem label={$t('common.surname')} errors={$errors.lastname}>
							<Input
								name="lastname"
								autocomplete="family-name"
								bind:value={$formValues.lastname}
								placeholder="Berziņš"
							/>
						</FormItem>
						<FormItem label={$t('common.email')} errors={$errors.email}>
							<Input
								type="email"
								name="email"
								autocomplete="email"
								bind:value={$formValues.email}
								placeholder="janis.berzins@venitte.shop"
							/>
						</FormItem>
						<FormItem label={$t('common.phone')} errors={$errors.phone}>
							<InputPhone name="phone" bind:value={$formValues.phone} />
						</FormItem>
					{:else if index === 1}
						<h2>{item.title}</h2>
						<FormItem label={$t('common.country')} errors={$errors.country}>
							<NewSelect
								name="country"
								options={countries.map((country) => ({
									label: $t(`common.countries.${country.label}`),
									value: country.iso
								}))}
								placeholder={$t('common.chooseSomething')}
								bind:value={$formValues.country}
								onchange={getDeliveryOptions}
							/>
						</FormItem>
						<FormItem label={$t('common.postcode')} errors={$errors.postcode}>
							<Input
								name="postcode"
								autocomplete="postal-code"
								placeholder="LV-1029"
								bind:value={$formValues.postcode}
							/>
						</FormItem>
						<FormItem label={$t('common.city')} errors={$errors.city}>
							<Input
								name="city"
								autocomplete="address-level2"
								placeholder="Rīga"
								bind:value={$formValues.city}
							/>
						</FormItem>
						<FormItem label={$t('common.address')} errors={$errors.address}>
							<Input
								name="address"
								autocomplete="street-address"
								placeholder="Brīvības iela 49/53"
								bind:value={$formValues.address}
							/>
						</FormItem>
						{#if deliveryTypes && deliveryTypes.length > 0}
							<FormItem label={$t('shop.chooseDelivery')} errors={$errors.deliveryType}>
								<Selector
									options={deliveryTypes.map((type) => ({
										value: type.key,
										label: `${$t(type.key)} ${toMoney(type.price)}`
									}))}
									bind:value={$formValues.deliveryType}
								/>
							</FormItem>
						{/if}
						{#if $formValues.deliveryType && destinationsList && destinationsList.length > 0}
							<FormItem label="{$t('shop.chooseDestination')} (Omniva)">
								<NewSelect
									name="deliveryDestination"
									placeholder={$t('common.chooseSomething')}
									options={destinationsList}
									bind:value={$formValues.deliveryDestination}
								/>
							</FormItem>
						{/if}
					{:else if index === 2}
						<h2>{item.title}</h2>
						<FormItem label={$t('shop.promo')}>
							<Input name="promocode" />
						</FormItem>
						<FormItem label={$t('shop.comments')}>
							<TextArea />
						</FormItem>
						<Checkbox name="rulesAgreed" label={$t('shop.agreeRules')} />
					{/if}
					<div class="flex justify-between items-center gap-2 mt-4">
						<Steps.PrevTrigger>
							<Button preset="tonal" icon={ChevronLeft} label={$t('common.back')} />
						</Steps.PrevTrigger>
						<div></div>
						<Steps.NextTrigger>
							<Button preset="tonal" afterIcon={ChevronRight} label={$t('common.next')} />
						</Steps.NextTrigger>
					</div>
				</Steps.Content>
			{/each}
		</div>
	</Steps>
</Section>
