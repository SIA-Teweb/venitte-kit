<script lang="ts">
	import type { SelectOption } from '$lib/types/ui';
	import { ChevronsUpDown } from '@lucide/svelte';
	import Badge from './Badge.svelte';
	import Input from './Input.svelte';
	import { clickOutside } from '$lib/helpers/events';
	import SelectList from './SelectList.svelte';

	let {
		options,
		placeholder = '',
		values = $bindable()
	}: { options: SelectOption[]; placeholder: string; values: SelectOption['value'][] } = $props();
	let searchValue = $state('');
	let isOpened = $state(false);
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

	function onFocus() {
		isOpened = !isOpened;
	}

	$effect(() => {
		if (searchValue) {
			localOptions = constructLocalOptions();
		}
	});
</script>

<div class="relative">
	<Input bind:value={searchValue} onclick={onFocus} {placeholder} afterIcon={ChevronsUpDown} />
	{#if isOpened}
		<div
			class="absolute p-2 w-full h-[500%] overflow-scroll top-[110%] no-scrollbar z-50 preset-bordered-card bg-surface-50"
			use:clickOutside
			onclickoutside={() => (isOpened = false)}
		>
			<SelectList options={localOptions} onchoose={chooseOption} />
		</div>
	{/if}
</div>
{#if values.length > 0}
	<div class="flex flex-wrap gap-2 mt-2">
		{#each localOptions.filter((option) => option.active) as option}
			<Badge>{option.label}</Badge>
		{/each}
	</div>
{/if}
