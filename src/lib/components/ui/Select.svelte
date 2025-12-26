<!-- <script lang="ts">
	let { options, name = undefined, value = $bindable(), onchange = undefined } = $props();

	function onChange(event: Event) {
		const target = event.target as HTMLOptionElement;

		if (!target) return;

		value = target.value;
		onchange?.(value);
	}
</script>

<select {name} class="select" onchange={onChange}>
	{#each options as option}
		<option value={option.value} selected={option.value === value}>{option.label}</option>
	{/each}
</select> -->

<script lang="ts">
	import { isMobileScreen } from '$lib/helpers/layout';
	import { openPopover } from '$lib/helpers/popover';
	import { createDialog } from '$lib/stores/dialogs';
	import { type SelectOption } from '$lib/types/ui';
	import { onMount } from 'svelte';
	import Input from './Input.svelte';
	import SelectList from './SelectList.svelte';
	import { ChevronsUpDown } from '@lucide/svelte';

	let {
		options,
		name = undefined,
		value = $bindable(undefined),
		onchange = undefined
	}: {
		options: SelectOption[];
		name?: string;
		value?: string | number;
		onchange?: (value: string | number) => void;
	} = $props();

	let valueLabel = $state('');

	function chooseOption(chosenValue: SelectOption['value']) {
		value = chosenValue;
		valueLabel = options.find((option) => option.value === chosenValue)?.label ?? '';
		onchange?.(chosenValue);
	}

	function onInputClick(event: Event) {
		const target = event.currentTarget as HTMLElement;

		if (isMobileScreen()) {
			createDialog({
				title: 'Choose option',
				content: {
					component: SelectList,
					props: {
						options,
						onchoose: chooseOption,
						closeOnChoose: true
					}
				}
			});
		} else {
			openPopover({
				target: target.parentElement!,
				width: 'parent',
				content: {
					component: SelectList,
					props: {
						options,
						onchoose: chooseOption,
						closeOnChoose: true
					}
				}
			});
		}
	}

	onMount(() => {
		if (value) valueLabel = options.find((option) => option.value === value)?.label ?? '';
	});
</script>

<Input
	{name}
	value={valueLabel}
	onclick={onInputClick}
	afterIcon={ChevronsUpDown}
	readonly={isMobileScreen()}
/>
