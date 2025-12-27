<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Order from '$lib/components/orders/Order.svelte';
	import CheckOrderForm from '$lib/components/widgets/CheckOrderForm.svelte';
	import { api } from '$lib/helpers/api';
	import { t } from '$lib/translations';
	import type { OrderResponse } from '$lib/types/orders';
	import { onMount } from 'svelte';

	const url = page.url;

	let email = url.searchParams.get('email') ?? undefined;
	let code = url.searchParams.get('code') ?? undefined;
	let type = url.searchParams.get('type') ?? undefined;
	let orderPromise = $state();
	let order: OrderResponse | undefined = $state();

	$effect(() => {
		if (order) {
			url.searchParams.set('email', order.email);
			url.searchParams.set('code', order.code);

			goto(url, { replaceState: true });
		}
	});

	onMount(() => {
		if (email && code) {
			orderPromise = api.orders.checkOrder({
				code,
				email
			});
		}
	});
</script>

{#if type && type === 'success'}
	<span>{$t('common.orderSuccess')}</span>
{/if}
{#if !orderPromise && !order}
	<div class="max-w-[300px] absolute flex self-center justify-center">
		<CheckOrderForm bind:response={order} />
	</div>
{:else}
	<Order orderPromise={orderPromise ?? Promise.resolve(order)} />
{/if}
