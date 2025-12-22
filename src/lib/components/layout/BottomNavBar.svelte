<script lang="ts">
	import { Handbag, Heart, House, LayoutDashboard } from '@lucide/svelte';
	import MenuButton from '../ui/MenuButton.svelte';
	import { ROUTES } from '$lib/constants/routes';
	import { goto } from '$app/navigation';
	import { t } from '$lib/translations';
	import { page } from '$app/state';
	import { cartStore } from '$lib/stores/cart';
	import Badge from '../ui/Badge.svelte';
	import { lastShopLinkStore } from '$lib/stores/navigation';
	import { sidebarStore } from '$lib/stores/sidebar';
	import CategoriesMenu from '../categories/CategoriesMenu.svelte';

	function openCategoriesDrawer() {
		if (!page.route.id?.startsWith(ROUTES.SHOP) && $lastShopLinkStore) {
			goto($lastShopLinkStore);

			return;
		}

		sidebarStore.open({
			id: 'categories-menu',
			title: 'Categories',
			side: 'left',
			content: {
				component: CategoriesMenu
			}
		});
	}
</script>

<nav
	class="md:hidden shadow h-[60px] fixed inset-x-0 bottom-0 bg-white flex gap-4 z-40 justify-around px-6 py-2"
>
	<MenuButton
		icon={House}
		label={$t('common.home')}
		onclick={() => goto(ROUTES.HOME)}
		isActive={page.route.id === ROUTES.HOME}
	/>
	<MenuButton
		icon={LayoutDashboard}
		label={$t('common.list')}
		onclick={openCategoriesDrawer}
		isActive={page.url.pathname.startsWith(ROUTES.SHOP)}
	/>
	<MenuButton
		icon={Heart}
		label={$t('common.wishList')}
		onclick={() => goto(ROUTES.WISHLIST)}
		isActive={page.route.id === ROUTES.WISHLIST}
	/>
	<MenuButton
		icon={Handbag}
		label={$t('common.cart')}
		onclick={() => goto(ROUTES.CART)}
		isActive={page.route.id === ROUTES.CART}
	>
		{#if $cartStore.length > 0}
			<Badge label={$cartStore.length} preset="icon" />
		{/if}
	</MenuButton>
</nav>
