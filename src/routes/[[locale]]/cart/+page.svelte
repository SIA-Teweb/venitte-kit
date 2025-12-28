<script lang="ts">
	import CartForm from '$lib/components/cart/CartForm.svelte';
	import CartProductsList from '$lib/components/cart/CartProductsList.svelte';
	import CartSummary from '$lib/components/cart/CartSummary.svelte';
	import SkeletonCartProductsList from '$lib/components/cart/SkeletonCartProductsList.svelte';
	import Section from '$lib/components/ui/Section.svelte';
	import { cartStore } from '$lib/stores/cart';
	import { createOrderForm } from '$lib/stores/forms';
	import { t } from '$lib/translations';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let isFormOpen = $state(false);

	const orderForm = createOrderForm();
	const { form } = orderForm;
</script>

<Section title={$t('common.cart')}>
	{#if $cartStore && $cartStore.length > 0 && data.variantsPromise}
		<form use:form class="grid grid-cols-1 md:grid-cols-[5fr_2fr] items-start gap-6">
			<div class="flex flex-col gap-10">
				{#await data.variantsPromise}
					<SkeletonCartProductsList itemsCount={$cartStore.length} />
				{:then variantsResponse}
					<CartProductsList variants={variantsResponse} />
					{#if isFormOpen && orderForm}
						<CartForm {orderForm} />
					{/if}
				{/await}
			</div>
			<div>
				{#await data.variantsPromise then variants}
					<CartSummary bind:isFormOpen {variants} />
				{/await}
			</div>
		</form>
	{:else}
		<span>{$t('shop.yourCartEmpty')}</span>
	{/if}
</Section>
