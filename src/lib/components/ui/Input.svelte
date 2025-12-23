<script lang="ts">
	import type { InputProps } from '$lib/types/ui';

	let {
		icon,
		afterIcon,
		value = $bindable(),
		placeholder,
		full = false,
		name,
		class: className,
		oninput,
		onfocus,
		onclick,
		ref = $bindable()
	}: InputProps = $props();

	const clases = $derived([full ? 'w-full' : '']);
	const Icon = $derived(icon);
	const AfterIcon = $derived(afterIcon);
</script>

<label class="flex input gap-2 items-stretch {clases} {className}" bind:this={ref}>
	{#if Icon}
		<Icon size={24} class="self-center" />
	{/if}
	<input class="w-full" {name} bind:value {placeholder} {oninput} {onfocus} {onclick} />
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
