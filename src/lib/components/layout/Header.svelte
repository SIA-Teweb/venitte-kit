<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import { Heart, Languages, House, Search, LayoutDashboard, Handbag } from '@lucide/svelte';
	import MenuButton from '../ui/MenuButton.svelte';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { locale, t } from '$lib/translations';
	import { sidebarStore } from '$lib/stores/sidebar';
	import CategoriesMenu from '../categories/CategoriesMenu.svelte';
	import { page } from '$app/state';
	import { createDialog } from '$lib/stores/dialogs';
	import LanguageSwitch from '../widgets/LanguageSwitch.svelte';
	import { openPopover } from '$lib/helpers/popover';
	import { lastShopLinkStore } from '$lib/stores/navigation';
	import SearchBar from '../widgets/SearchBar.svelte';
	import { cartStore } from '$lib/stores/cart';
	import Badge from '../ui/Badge.svelte';

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

	function openLanguageSelect() {
		createDialog({
			title: $t('common.switchLanguage'),
			content: {
				component: LanguageSwitch
			}
		});
	}
</script>

<header
	class="fixed px-6 flex z-40 top-0 left-0 right-0 h-(--header-height) p-2 bg-white shadow justify-center"
>
	<!-- Desktop Header -->
	<div class="md:flex hidden w-full max-w-[1200px] gap-6 items-stretch">
		<img class="py-2" src={logo} alt="Venitte Logo" />
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
		<SearchBar />
		<MenuButton
			icon={Languages}
			label={$t(`common.${$locale}`)}
			onclick={(event: Event) =>
				openPopover({
					target: event.currentTarget as HTMLElement,
					content: {
						component: LanguageSwitch
					}
				})}
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
	</div>
	<!-- End of Desktop Header -->

	<!-- Mobile Header -->
	<div class="md:hidden flex w-full max-w-[1200px] gap-6 items-stretch justify-between">
		<button>
			<Search />
		</button>
		<img class="py-2" src={logo} alt="Venitte Logo" />
		<button>
			<Languages onclick={openLanguageSelect} />
		</button>
	</div>
	<!-- End of Mobile Header -->
</header>
