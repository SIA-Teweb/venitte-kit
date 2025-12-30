<script lang="ts">
	import type { BadgeProps } from '$lib/types/ui';
	import { scale } from 'svelte/transition';

	let {
		icon,
		children,
		preset = 'tonal',
		onclick,
		class: className = undefined
	}: BadgeProps = $props();

	const presets = {
		tonal: 'badge preset-tonal',
		warning: 'badge preset-tonal-error',
		icon: 'badge-icon preset-filled-tertiary-500 absolute top-0 right-[-30%] p-[3px] leading-none'
	};

	const Icon = $derived(icon);
</script>

<button
	type="button"
	class="{presets[preset]} {className} whitespace-normal text-left wrap-break-word"
	in:scale
	{onclick}
>
	{#if icon}
		<Icon />
	{/if}
	{@render children?.()}
</button>
