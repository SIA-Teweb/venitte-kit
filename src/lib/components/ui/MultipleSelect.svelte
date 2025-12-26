<script lang="ts">
	import type { SelectOption } from '$lib/types/ui';
	import { ChevronsUpDown } from '@lucide/svelte';
	import Badge from './Badge.svelte';
	import Input from './Input.svelte';
	import SelectList from './SelectList.svelte';
	import { openPopover } from '$lib/helpers/popover';
	import { isMobileScreen } from '$lib/helpers/layout';
	import { createDialog } from '$lib/stores/dialogs';

	let {
		options,
		placeholder = '',
		values = $bindable()
	}: {
		options: SelectOption[];
		placeholder: string;
		values: SelectOption['value'][];
	} = $props();

	let searchValue = $state('');
	let localOptions = $derived(constructLocalOptions());

	function chooseOption(value: SelectOption['value']) {
		if (values.includes(value)) {
			values = values.filter((optionValue) => optionValue !== value);
		} else {
			values = [...values, value];
		}
	}

	function constructLocalOptions() {
		return options
			.filter((option) => option.label.includes(searchValue))
			.map((option) => ({
				...option,
				active: values.includes(option.value)
			}));
	}

	function onInputClick(event: Event) {
		const target = event.currentTarget as HTMLElement;

		if (isMobileScreen()) {
			createDialog({
				title: 'Choose option',
				content: {
					component: SelectList,
					props: {
						onchoose: chooseOption
					},
					getProps: () => ({
						options: localOptions
					})
				}
			});
		} else {
			openPopover({
				target: target.parentElement!,
				width: 'parent',
				content: {
					component: SelectList,
					props: {
						onchoose: chooseOption
					},
					getProps: () => ({
						options: localOptions
					})
				}
			});
		}
	}

	$effect(() => {
		if (searchValue) {
			localOptions = constructLocalOptions();
		}
	});
</script>

<div class="relative">
	<Input
		bind:value={searchValue}
		onclick={onInputClick}
		{placeholder}
		afterIcon={ChevronsUpDown}
		readonly={isMobileScreen()}
	/>
</div>
{#if values.length > 0}
	<div class="flex flex-wrap gap-2 mt-2">
		{#each localOptions.filter((option) => option.active) as option}
			<Badge>{option.label}</Badge>
		{/each}
	</div>
{/if}
