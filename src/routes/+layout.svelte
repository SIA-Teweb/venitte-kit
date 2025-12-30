<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import type { LayoutData } from './$types';
	import { categoriesStore } from '$lib/stores/categories';
	import Dialog from '$lib/components/ui/Dialog.svelte';
	import BottomNavBar from '$lib/components/layout/BottomNavBar.svelte';
	import Toaster from '$lib/components/widgets/Toaster.svelte';
	import { beforeNavigate } from '$app/navigation';
	import { previousUrl } from '$lib/stores/navigation';

	let { data, children }: { data: LayoutData; children: any } = $props();

	beforeNavigate(({ from }) => {
		if (from) previousUrl.set(from.url);
	});

	$effect(() => {
		categoriesStore.set(data.categories);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main
	class="pt-(--header-height) pb-(--navbar-height) md:pb-0 flex flex-col gap-20 min-h-dvh h-full items-center"
>
	<Toaster />
	<Dialog />
	<Header />
	<Sidebar />
	<div class="flex flex-col flex-1 gap-20 my-10 px-4 md:px-6 max-w-[1200px] w-full">
		{@render children()}
	</div>
	<BottomNavBar />
	<Footer />
</main>
