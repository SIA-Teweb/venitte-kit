<script lang="ts">
	import type { BadgeProps } from '$lib/types/ui';
	import { scale } from 'svelte/transition';

	let { icon, label, preset = 'tonal' }: BadgeProps = $props();

	const presets = {
		tonal: 'badge preset-tonal',
		warning: 'badge preset-tonal-error',
		icon: 'badge-icon preset-filled-tertiary-500 absolute top-0 right-[-30%] p-[3px] leading-none'
	};

	const Icon = $derived(icon);
</script>

<div class={presets[preset]} in:scale>
	{#if icon}
		<Icon />
	{/if}
	<span>{label}</span>
</div>
