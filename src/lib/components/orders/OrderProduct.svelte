<script lang="ts">
	import { toMoney } from '$lib/helpers/strings';
	import { t, locale } from '$lib/translations';
	import type { OrderResponseItem } from '$lib/types/orders';
	import Image from '../ui/Image.svelte';
	import OrderStatusBadge from './OrderStatusBadge.svelte';

	let { orderItem }: { orderItem: OrderResponseItem } = $props();
</script>

<div class="preset-bordered-card flex gap-2 p-4">
	<div class="h-24 w-24">
		<Image src={orderItem.image.thumbnails[0].link} alt={orderItem.name} />
	</div>
	<div class="grid md:grid-cols-[repeat(4,auto)_min-content] items-center grow">
		<span class="text-lg col-span-5 md:col-span-1">{orderItem.name}</span>
		<div class="col-span-5 md:col-span-1">
			{#each orderItem.options as option}
				<span>{option.name[$locale]}: {option.value}</span>
			{/each}
		</div>
		<span class="col-span-2 md:col-span-1">{orderItem.amount} {$t('common.pcs')}.</span>
		<span class="col-span-2 md:col-span-1">{toMoney(orderItem.price)}</span>
		<OrderStatusBadge label={orderItem.status} type="orderItemStatus" />
	</div>
</div>
