<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import type { LayoutData } from './$types';
	import { categoriesStore } from '$lib/stores/categories';
	import { onMount } from 'svelte';
	import { restoreWishList } from '$lib/helpers/wishList';
	import Dialog from '$lib/components/ui/Dialog.svelte';
	import { restoreCart } from '$lib/helpers/cart';
	import BottomNavBar from '$lib/components/layout/BottomNavBar.svelte';
	import storage from '$lib/helpers/storage';
	import { loadTranslations } from '$lib/translations';
	import Toaster from '$lib/components/widgets/Toaster.svelte';

	let { data, children }: { data: LayoutData; children: any } = $props();

	onMount(() => {
		restoreCart();
		restoreWishList();
	});

	$effect(() => {
		categoriesStore.set(data.categories);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="pt-(--header-height) flex flex-col gap-20 min-h-dvh h-full items-center">
	<Toaster />
	<Dialog />
	<Header />
	<Sidebar />
	<div class="flex flex-col flex-1 gap-20 my-10 px-4 md:px-6 max-w-[1200px] w-full">
		{@render children()}
	</div>
	<BottomNavBar />
	<Footer />
</div>
