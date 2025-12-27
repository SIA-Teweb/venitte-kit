<script lang="ts">
	import { t } from '$lib/translations';
	import { Search, TriangleAlert } from '@lucide/svelte';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import type { SelectOption } from '$lib/types/ui';
	import Item from './Item.svelte';
	let {
		options,
		onchoose,
		class: className = '',
		closeDialog,
		closePopover,
		closeOnChoose = false
	}: {
		options: SelectOption[];
		onchoose: (value: string | number) => void;
		class: string;
		closeDialog?: () => void;
		closePopover?: () => void;
		closeOnChoose?: boolean;
	} = $props();

	let localOptions = $derived.by(() => getLocalOptions() ?? options);
	let searchString = $state('');

	function getLocalOptions() {
		return searchString ? options.filter((option) => option.label.includes(searchString)) : options;
	}
</script>

<div class="flex flex-col gap-2 w-full {className} max-h-64 overflow-scroll no-scrollbar">
	{#if localOptions.length === 0}
		<div class="self-center">
			<Item icon={TriangleAlert} value={$t('common.noData')} />
		</div>
	{/if}
	{#each localOptions as option}
		<Button
			preset={option.active ? 'primary' : 'ghost'}
			label={option.label}
			onclick={() => {
				onchoose(option.value);
				if (closeOnChoose) {
					closePopover?.();
					closeDialog?.();
				}
			}}
			full
			isMenu
		/>
	{/each}
	{#if options.length > 5}
		<div class="sticky bottom-0">
			<Input bind:value={searchString} icon={Search} placeholder={$t('shop.startTyping')} />
		</div>
	{/if}
</div>
