<script lang="ts">
	import { CalendarDays, CreditCard, Mail, MapPin, Phone, User, Van } from '@lucide/svelte';
	import Item from '../ui/Item.svelte';
	import OrderHeaderBlock from './OrderHeaderBlock.svelte';
	import { formatDateLong, toMoney } from '$lib/helpers/strings';
	import { t } from '$lib/translations';

	let { order } = $props();
</script>

<div class="grid grid-cols-1 md:grid-cols-4 gap-2">
	<OrderHeaderBlock title={$t('shop.contactData')}>
		<Item icon={User} value={`${order.firstname} ${order.lastname}`} />
		<Item icon={Mail} value={order.email} />
		<Item icon={Phone} value={order.phone} />
	</OrderHeaderBlock>
	<OrderHeaderBlock title={$t('shop.deliveryAndComments')}>
		<Item icon={MapPin} value={`${order.address} ${order.city} ${order.postcode}`} />
	</OrderHeaderBlock>
	<OrderHeaderBlock title={$t('shop.dateAndStatus')}>
		<Item icon={CalendarDays} value={formatDateLong(order.createdAt)} />
	</OrderHeaderBlock>
	<OrderHeaderBlock title={$t('shop.dateAndStatus')}>
		<Item icon={CreditCard} value={toMoney(order.totalPrice)} />
		<Item icon={Van} value={toMoney(order.deliveryPrice)} />
	</OrderHeaderBlock>
</div>
