<script lang="ts">
	import type { SelectOption } from '$lib/types/ui';

	let {
		name,
		options,
		value = $bindable(),
		suffix = undefined,
		onchange
	}: {
		name?: string;
		options: SelectOption[];
		value: string | number | undefined;
		suffix?: string;
		onchange?: (value: string | number) => void;
	} = $props();

	let hiddenInput: HTMLElement;

	function onChooseOption(chosenValue: string | number) {
		value = chosenValue;
		if (hiddenInput) hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
		onchange?.(value);
	}
</script>

<div class="flex flex-wrap gap-2">
	{#each options as option}
		<button
			type="button"
			class="btn {option.value === value ? 'preset-filled' : 'preset-outlined-surface-500'}"
			onclick={() => onChooseOption(option.value)}
			disabled={option.disabled ?? false}
		>
			<span>{option.label}</span>
			{#if suffix}
				<span>{suffix}</span>
			{/if}
		</button>
	{/each}
</div>
<input type="hidden" {value} {name} bind:this={hiddenInput} />
