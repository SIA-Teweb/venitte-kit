<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import {
		Heart,
		Languages,
		House,
		Search,
		LayoutDashboard,
		Handbag,
		ChevronLeft
	} from '@lucide/svelte';
	import MenuButton from '../ui/MenuButton.svelte';
	import { goto } from '$app/navigation';
	import { route, ROUTES } from '$lib/constants/routes';
	import { locale, setLocale, t } from '$lib/translations';
	import { sidebarStore } from '$lib/stores/sidebar';
	import CategoriesMenu from '../categories/CategoriesMenu.svelte';
	import { page } from '$app/state';
	import { createDialog } from '$lib/stores/dialogs';
	import { openPopover } from '$lib/helpers/popover';
	import { lastShopLinkStore, previousUrl } from '$lib/stores/navigation';
	import SearchBar from '../widgets/SearchBar.svelte';
	import { cartStore } from '$lib/stores/cart';
	import Badge from '../ui/Badge.svelte';
	import { isMobileScreen } from '$lib/helpers/layout';
	import SelectList from '../ui/SelectList.svelte';

	let isSearchBarOpen = $state(false);

	let languageOptions = $derived([
		{
			label: 'Русский',
			value: 'ru',
			active: $locale === 'ru'
		},
		{
			label: 'English',
			value: 'en',
			active: $locale === 'en'
		},
		{
			label: 'Latviešu',
			value: 'lv',
			active: $locale === 'lv'
		}
	]);

	const isActiveButton = (route: string) => page.url.pathname === route;

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

	function openLanguageSelect(event: Event) {
		if (isMobileScreen()) {
			createDialog({
				title: $t('common.switchLanguage'),
				content: {
					component: SelectList,
					props: {
						onchoose: setLocale,
						closeOnChoose: true
					},
					getProps: () => ({
						options: languageOptions
					})
				}
			});
		} else {
			const target = event.currentTarget as HTMLElement;
			openPopover({
				target,
				content: {
					component: SelectList,
					props: {
						onchoose: setLocale
					},
					getProps: () => ({
						options: languageOptions
					})
				}
			});
		}
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
			onclick={() => {
				goto(route(ROUTES.HOME, $locale));
			}}
			isActive={isActiveButton(route(ROUTES.HOME, $locale))}
		/>
		<MenuButton
			icon={LayoutDashboard}
			label={$t('common.list')}
			onclick={openCategoriesDrawer}
			isActive={page.url.pathname.startsWith(route(ROUTES.SHOP, $locale))}
		/>
		<SearchBar />
		<MenuButton icon={Languages} label={$t(`common.${$locale}`)} onclick={openLanguageSelect} />
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
				<Badge preset="icon">{$cartStore.length}</Badge>
			{/if}
		</MenuButton>
	</div>
	<!-- End of Desktop Header -->

	<!-- Mobile Header -->
	<div class="md:hidden flex w-full max-w-[1200px] gap-6 items-stretch justify-between">
		{#if !isSearchBarOpen}
			<div class="flex gap-4">
				{#if $previousUrl && page.url.pathname !== route(ROUTES.HOME, $locale)}
					<button onclick={() => goto($previousUrl)}>
						<ChevronLeft />
					</button>
				{/if}
				<button onclick={() => (isSearchBarOpen = true)}>
					<Search />
				</button>
			</div>
			<img
				class="absolute left-1/2 top-0 -translate-x-1/2 h-full py-4"
				src={logo}
				alt="Venitte Logo"
			/>
			<button onclick={openLanguageSelect}>
				<Languages />
			</button>
		{:else}
			<SearchBar onClosePopover={() => (isSearchBarOpen = false)} />
		{/if}
	</div>
	<!-- End of Mobile Header -->
</header>
