<script lang="ts">
	import { Handbag, Heart, House, LayoutDashboard } from '@lucide/svelte';
	import MenuButton from '../ui/MenuButton.svelte';
	import { route, ROUTES } from '$lib/constants/routes';
	import { goto } from '$app/navigation';
	import { t, locale } from '$lib/translations';
	import { page } from '$app/state';
	import { cartStore } from '$lib/stores/cart';
	import Badge from '../ui/Badge.svelte';
	import { lastShopLinkStore } from '$lib/stores/navigation';
	import { sidebarStore } from '$lib/stores/sidebar';
	import CategoriesMenu from '../categories/CategoriesMenu.svelte';

	function openCategoriesDrawer() {
		if (!page.url.pathname.startsWith(route(ROUTES.SHOP, $locale)) && $lastShopLinkStore) {
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

	const isActiveButton = (route: string) => page.url.pathname === route;
</script>

<nav
	class="md:hidden shadow h-[60px] fixed inset-x-0 bottom-0 bg-white flex gap-4 z-40 justify-around px-6 py-2"
>
	<MenuButton
		icon={House}
		label={$t('common.home')}
		onclick={() => goto(route(ROUTES.HOME, $locale))}
		isActive={isActiveButton(route(ROUTES.HOME, $locale))}
	/>
	<MenuButton
		icon={LayoutDashboard}
		label={$t('common.list')}
		onclick={openCategoriesDrawer}
		isActive={page.url.pathname.startsWith(route(ROUTES.SHOP, $locale))}
	/>
	<MenuButton
		icon={Heart}
		label={$t('common.wishList')}
		onclick={() => goto(route(ROUTES.WISHLIST, $locale))}
		isActive={isActiveButton(route(ROUTES.WISHLIST, $locale))}
	/>
	<MenuButton
		icon={Handbag}
		label={$t('common.cart')}
		onclick={() => goto(route(ROUTES.CART, $locale))}
		isActive={isActiveButton(route(ROUTES.CART, $locale))}
	>
		{#if $cartStore.length > 0}
			<Badge label={$cartStore.length} preset="icon" />
		{/if}
	</MenuButton>
</nav>
