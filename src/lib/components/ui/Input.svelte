<script lang="ts">
	import type { InputProps } from '$lib/types/ui';

	let {
		icon,
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

	const clases = $derived([full ? 'w-full' : '', { className }]);
	const Icon = $derived(icon);
</script>

<label class="flex input gap-2 items-stretch {clases}" bind:this={ref}>
	{#if icon}
		<Icon size={24} class="self-center" />
	{/if}
	<input class="w-full" {name} bind:value {placeholder} {oninput} {onfocus} {onclick} />
</label>

<style>
	input {
		all: unset;
		width: 100%;
	}
</style>
