<script lang="ts" generics="T extends string | number, M extends boolean = false">
	import { isMobileScreen } from '$lib/helpers/layout';
	import { createDialog } from '$lib/stores/dialogs';
	import type { SelectProps } from '$lib/types/ui';
	import { ChevronsUpDown } from '@lucide/svelte';
	import SelectList from './SelectList.svelte';
	import { openPopover } from '$lib/helpers/popover';
	import { onMount, tick } from 'svelte';
	import Badge from './Badge.svelte';

	type Props = SelectProps<T, M>;

	let {
		name,
		options,
		value = $bindable(),
		placeholder,
		class: className,
		multiple = false as M,
		onchange
	}: Props = $props();

	let valueLabel: string | undefined = $state(undefined);
	let hiddenInput: HTMLElement;

	let localOptions = $derived(constructLocalOptions());

	function constructLocalOptions() {
		console.log(options);
		return options.map((option) => ({
			...option,
			active: (value as T[]).includes(option.value as T)
		}));
	}

	function onChooseOption(optionValue: T) {
		if (multiple) {
			const currentValues = value as T[];

			if (currentValues.includes(optionValue)) {
				value = currentValues.filter((v) => v !== optionValue) as any;
			} else {
				value = [...currentValues, optionValue] as any;
			}

			onchange?.(value);
		}

		if (!multiple) {
			value = optionValue as any;
			tick().then(() => {
				valueLabel = options.find((option) => option.value === optionValue)?.label ?? '';
				if (hiddenInput) hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
				onchange?.(value);
			});
		}
	}

	function onSelectClick(event: Event) {
		const target = event.currentTarget as HTMLElement;

		if (isMobileScreen()) {
			createDialog({
				title: 'Choose option',
				content: {
					component: SelectList,
					props: {
						onchoose: onChooseOption,
						closeOnChoose: !multiple
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
						onchoose: onChooseOption,
						closeOnChoose: !multiple
					},
					getProps: () => ({
						options: localOptions
					})
				}
			});
		}
	}

	onMount(() => {
		if (!multiple && value) {
			valueLabel = options.find((option) => option.value === value)?.label ?? '';
		}
	});
</script>

<div class={className}>
	<button
		type="button"
		class="input flex items-center gap-2 truncate justify-between"
		onclick={onSelectClick}
	>
		{#if !valueLabel && placeholder}
			<span class="text-surface-200">{placeholder}</span>
		{/if}
		<span>{valueLabel}</span>
		<ChevronsUpDown size={24} />
	</button>
</div>
<input type="hidden" {name} {value} bind:this={hiddenInput} />
{#if multiple && (value as T[]).length > 0}
	<div class="flex flex-wrap gap-2 mt-2">
		{#each localOptions.filter((option) => option.active) as option}
			<Badge>{option.label}</Badge>
		{/each}
	</div>
{/if}
