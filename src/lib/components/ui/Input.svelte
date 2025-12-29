<script lang="ts">
	import type { InputProps } from '$lib/types/ui';

	let {
		type = 'text',
		icon,
		afterIcon,
		value = $bindable(),
		placeholder,
		full = false,
		name,
		inputmode = undefined,
		autocomplete = 'off',
		class: className,
		readonly = false,
		oninput,
		onfocus,
		onblur,
		onclick,
		ref = $bindable()
	}: InputProps = $props();

	const clases = $derived([full ? 'w-full' : '']);
	const Icon = $derived(icon);
	const AfterIcon = $derived(afterIcon);

	function onClick(event: Event) {
		event.preventDefault();
		onclick?.(event);
	}
</script>

<label class="flex input gap-2 items-stretch {clases} {className}" bind:this={ref}>
	{#if Icon}
		<Icon size={24} class="self-center" color="var(--color-surface-300)" />
	{/if}
	<input
		class="w-full placeholder-surface-200"
		{type}
		{inputmode}
		{autocomplete}
		{name}
		bind:value
		{placeholder}
		{oninput}
		{onfocus}
		{onblur}
		onclick={onClick}
		{readonly}
	/>
	{#if AfterIcon}
		<AfterIcon size={24} class="self-center" />
	{/if}
</label>

<style>
	input {
		all: unset;
		width: 100%;
	}
</style>
