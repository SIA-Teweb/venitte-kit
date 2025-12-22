<script lang="ts">
	import type { ButtonProps } from '$lib/types/ui';

	let {
		type = 'button',
		label,
		icon,
		afterIcon,
		full,
		preset = 'primary',
		onclick,
		isMenu = false,
		iconSized = false,
		disabled = false,
		class: className
	}: ButtonProps = $props();

	const presets = {
		primary: 'preset-filled',
		tonal: 'preset-tonal',
		ghost: 'bg-transparent hover:preset-tonal'
	};

	const clases = $derived([
		iconSized ? 'btn-icon' : 'btn',
		presets[preset],
		full ? 'w-full' : '',
		isMenu ? 'flex' : '',
		className
	]);

	const Icon = $derived(icon);
	const AfterIcon = $derived(afterIcon);
</script>

<button {type} class={clases} {onclick} {disabled}>
	{#if icon}
		<Icon />
	{/if}
	{#if label}
		<span class={isMenu ? 'grow text-start' : ''}>{label}</span>
	{/if}
	{#if afterIcon}
		<AfterIcon />
	{/if}
</button>
