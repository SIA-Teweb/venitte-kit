<script lang="ts">
	import { categoriesStore } from '$lib/stores/categories';
	import { locale, t } from '$lib/translations';
	import Button from '../ui/Button.svelte';
	import type { Category } from '$lib/types/categories';
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants/routes';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';

	let { trail = [], closeSidebar = undefined } = $props();

	function resetCategory() {
		trail = [];
	}

	function nextCategory(category: Category) {
		trail = [...trail, category];
	}

	function handleClick(category: Category) {
		if (!category) return resetCategory();

		if (category.children && category.children.length > 0) return nextCategory(category);

		nextCategory(category);
		openCategory();
	}

	function openCategory() {
		const link = trail.map((category) => category.link).join('/');

		goto(`${ROUTES.SHOP}/${link}`);
		closeSidebar?.();
	}
</script>

<div class="flex flex-col gap-2">
	{#if trail.length > 0}
		<Button
			preset="ghost"
			icon={ChevronLeft}
			label={$t('common.back')}
			onclick={() => handleClick(trail.at(-2))}
			isMenu
		/>
		<Button preset="ghost" label={$t('common.surfAll')} onclick={() => openCategory()} isMenu />
		<hr class="hr" />
	{/if}
	{#each trail.length > 0 ? trail.at(-1).children : $categoriesStore as category}
		<Button
			preset="ghost"
			label={category.name[$locale]}
			afterIcon={category.children.length > 0 ? ChevronRight : undefined}
			onclick={() => handleClick(category)}
			isMenu
		/>
	{/each}
</div>
