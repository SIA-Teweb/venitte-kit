<script lang="ts">
	import type { InputProps } from '$lib/types/ui';

	let {
		value = $bindable(),
		placeholder,
		full = false,
		name,
		oninput,
		onfocus,
		onclick,
		ref = $bindable()
	}: InputProps = $props();

	const clases = $derived([full ? 'w-full' : '', 'input']);
</script>

<textarea
	class={clases}
	{name}
	bind:this={ref}
	bind:value
	{placeholder}
	{oninput}
	{onfocus}
	{onclick}
></textarea>
