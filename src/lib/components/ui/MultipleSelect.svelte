<script lang="ts">
	import type { SelectOption } from '$lib/types/ui';
	import { ChevronsUpDown } from '@lucide/svelte';
	import Badge from './Badge.svelte';
	import Input from './Input.svelte';
	import MultipleSelectOptions from './MultipleSelectOptions.svelte';

	let {
		options,
		placeholder = '',
		values = $bindable()
	}: { options: SelectOption[]; placeholder: string; values: SelectOption['value'][] } = $props();
	let searchValue = $state('');
	let isFocused = $state(false);
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
		isFocused = !isFocused;
	}

	$effect(() => {
		if (searchValue) {
			localOptions = constructLocalOptions();
		}
	});
</script>

<div class="relative">
	<Input bind:value={searchValue} onclick={onFocus} {placeholder} afterIcon={ChevronsUpDown} />
	{#if isFocused}
		<MultipleSelectOptions
			bind:isOpened={isFocused}
			options={localOptions}
			onchoose={chooseOption}
		/>
	{/if}
</div>
{#if values.length > 0}
	<div class="flex flex-wrap gap-2 mt-2">
		{#each localOptions.filter((option) => option.active) as option}
			<Badge label={option.label} />
		{/each}
	</div>
{/if}
