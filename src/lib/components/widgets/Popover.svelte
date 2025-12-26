<script lang="ts">
	import { clickOutside } from '$lib/helpers/events';
	import { scale } from 'svelte/transition';

	let { content, close, width = '' } = $props();

	let TheComponent = $derived(content.component);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close?.();
	}
</script>

<div
	class="absolute mt-2 z-20 top-full bg-surface-50 p-4 rounded-xl shadow {width === 'parent'
		? 'w-full left-0'
		: 'w-auto'}"
	use:clickOutside
	onclickoutside={() => close?.()}
	onclick={(e) => e.stopImmediatePropagation()}
	transition:scale={{ duration: 200 }}
	role="dialog"
	tabindex="-1"
	onkeydown={handleKeydown}
>
	<TheComponent {...content.props} {...content.getProps?.()} closePopover={close} />
</div>
