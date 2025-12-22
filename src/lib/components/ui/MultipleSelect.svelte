<script lang="ts">
	import type { SelectOption } from '$lib/types/ui';
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
		return options.map((option) => ({
			...option,
			active: values.includes(option.value)
		}));
	}

	function onFocus() {
		isFocused = !isFocused;
	}
</script>

<div class="relative">
	<Input bind:value={searchValue} onfocus={onFocus} {placeholder} />
	{#if isFocused}
		<MultipleSelectOptions options={localOptions} onchoose={chooseOption} />
	{/if}
</div>
{#if values.length > 0}
	<div class="flex flex-wrap gap-2 mt-2">
		{#each localOptions.filter((option) => option.active) as option}
			<Badge label={option.label} />
		{/each}
	</div>
{/if}
