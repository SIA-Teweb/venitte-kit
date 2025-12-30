<script lang="ts">
	import type { MenuButtonProps } from '$lib/types/ui';

	let { icon, label, onclick, isActive = false, children }: MenuButtonProps = $props();

	const Icon = $derived(icon);
</script>

<button type="button" class="relative flex flex-col items-center" {onclick}>
	{@render children?.()}
	<Icon class="h-full" size={28} fill={isActive ? '' : 'none'} color={isActive ? '' : 'black'} />
	{#if label}
		<span class="text-xs">{label}</span>
	{/if}
</button>
