<script lang="ts">
	import {
		OrderItemStatusEnum,
		OrderStatusColorsEnum,
		OrderStatusEnum,
		OrderPaidStatusEnum
	} from '$lib/enums/orders';
	import { t } from '$lib/translations';
	import { Check, CheckCheck, Clock, Package, Van, XIcon, type Component } from '@lucide/svelte';

	type StatusPreset = {
		icon: typeof Component;
		color: OrderStatusColorsEnum;
		label: string;
	};

	const orderStatus: Record<OrderStatusEnum, StatusPreset> = {
		[OrderStatusEnum.New]: {
			icon: Check,
			color: OrderStatusColorsEnum.New,
			label: 'new'
		},
		[OrderStatusEnum.InProgress]: {
			icon: Clock,
			color: OrderStatusColorsEnum.Waiting,
			label: 'pending'
		},
		[OrderStatusEnum.Done]: {
			icon: CheckCheck,
			color: OrderStatusColorsEnum.Completed,
			label: 'completed'
		},
		[OrderStatusEnum.Cancelled]: {
			icon: XIcon,
			color: OrderStatusColorsEnum.Canceled,
			label: 'canceled'
		}
	};

	const orderItemStatus: Record<OrderItemStatusEnum, StatusPreset> = {
		[OrderItemStatusEnum.New]: {
			icon: Check,
			color: OrderStatusColorsEnum.New,
			label: 'new'
		},
		[OrderItemStatusEnum.Ordered]: {
			icon: Clock,
			color: OrderStatusColorsEnum.Waiting,
			label: 'ordered'
		},
		[OrderItemStatusEnum.OnTheWay]: {
			icon: Van,
			color: OrderStatusColorsEnum.Waiting,
			label: 'onTheWay'
		},
		[OrderItemStatusEnum.Delivered]: {
			icon: Package,
			color: OrderStatusColorsEnum.Waiting,
			label: 'delivered'
		},
		[OrderItemStatusEnum.Done]: {
			icon: CheckCheck,
			color: OrderStatusColorsEnum.Completed,
			label: 'completed'
		},
		[OrderItemStatusEnum.Cancelled]: {
			icon: XIcon,
			color: OrderStatusColorsEnum.Canceled,
			label: 'canceled'
		}
	};

	const orderPaidStatus: Record<OrderPaidStatusEnum, StatusPreset> = {
		[OrderPaidStatusEnum.Paid]: {
			icon: CheckCheck,
			color: OrderStatusColorsEnum.Completed,
			label: 'paid'
		},
		[OrderPaidStatusEnum.NotPaid]: {
			icon: XIcon,
			color: OrderStatusColorsEnum.Canceled,
			label: 'notPaid'
		}
	};

	const presets = {
		orderItemStatus: orderItemStatus,
		orderStatus: orderStatus,
		orderPaidStatus: orderPaidStatus
	};

	let {
		type,
		label
	}: {
		type: 'orderStatus' | 'orderItemStatus' | 'orderPaidStatus';
		label: OrderStatusEnum | OrderItemStatusEnum | OrderPaidStatusEnum;
	} = $props();

	let status = $derived((presets[type] as any)[label]) as StatusPreset;
	const Icon = $derived(status.icon);
</script>

<div class="badge {status.color} preset-filled rounded-xl w-min">
	{#if Icon}
		<Icon size={20} />
	{/if}
	<span class="text-medium">{$t(`common.${status.label}`)}</span>
</div>
