<script lang="ts">
	import type { SelectOption } from '$lib/types/ui';

	let {
		options,
		value = $bindable(),
		suffix = undefined,
		onchange
	}: {
		options: SelectOption[];
		value: string | number | undefined;
		suffix?: string;
		onchange?: (value: string | number) => void;
	} = $props();

	function onChooseOption(chosenValue: string | number) {
		value = chosenValue;
		onchange?.(value);
	}

	$effect(() => {
		console.log(value);
	});
</script>

<div class="flex flex-wrap gap-2">
	{#each options as option}
		<button
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
