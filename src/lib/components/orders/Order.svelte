<script lang="ts">
	import { t } from '$lib/translations';
	import type { OrderResponse } from '$lib/types/orders';
	import Section from '../ui/Section.svelte';
	import SkeletonOrder from './SkeletonOrder.svelte';
	import OrderHeader from './OrderHeader.svelte';
	import OrderProductsList from './OrderProductsList.svelte';

	let { orderPromise }: { orderPromise: Promise<OrderResponse> } = $props();
</script>

{#await orderPromise}
	<SkeletonOrder />
{:then order}
	<Section title={`${$t('shop.code')} ${order.code}`} class="space-y-4">
		<OrderHeader {order} />
		<OrderProductsList orderItems={order.items} />
	</Section>
{/await}
