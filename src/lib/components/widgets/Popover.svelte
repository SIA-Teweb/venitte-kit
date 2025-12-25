<script lang="ts">
	import { clickOutside } from '$lib/helpers/events';
	import { closePopover } from '$lib/helpers/popover';
	import { scale } from 'svelte/transition';

	let { content, close, width = '' } = $props();

	let TheComponent = $derived(content.component);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class="absolute mt-2 z-20 top-full bg-surface-50 p-4 rounded-xl shadow {width === 'parent'
		? 'w-full left-0'
		: 'w-auto'}"
	use:clickOutside
	onclickoutside={() => close?.()}
	onclick={(e) => e.stopImmediatePropagation()}
	transition:scale={{ duration: 200 }}
>
	<TheComponent {...content.props} closePopover={close} />
</div>
