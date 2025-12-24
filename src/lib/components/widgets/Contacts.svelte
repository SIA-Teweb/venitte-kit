<script>
	import { Hash, HouseHeart, MessageCircle } from '@lucide/svelte';
	import Item from '../ui/Item.svelte';
	import { t } from '$lib/translations';
</script>

<div class="flex flex-col gap-4">
	<Item icon={HouseHeart} label={$t('common.companyName')} value="SIA Teweb" />
	<Item icon={Hash} label={$t('common.registrationNumber')} value="40203457703" />
	<Item icon={MessageCircle} label="WhatsApp" value="Venitte" />
	<Item icon={MessageCircle} label="Facebook" value="Venitte.shop" />
</div>
