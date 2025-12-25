<script lang="ts">
	import { clickOutside } from '$lib/helpers/events';
	import { scrollLocker } from '$lib/helpers/layout';
	import { closePopover } from '$lib/helpers/popover';
	import { onMount } from 'svelte';
	import { cubicIn } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	let { x, y, width = 'auto', content, onClose } = $props();

	let isOpened = $state(false);
	let popoverRef: HTMLDivElement | undefined = $state();

	const TheComponent = $derived(content.component);

	function close() {
		isOpened = false;
		closePopover();
		onClose?.();
	}

	onMount(() => {
		isOpened = true;
	});
</script>

{#if isOpened}
	<div
		bind:this={popoverRef}
		style="left: {x}px; top: {y}px; width: {width}"
		class="absolute z-50 mt-2 transform translate-x-[-50%] rounded-xl bg-white p-4 shadow"
		transition:scale={{ duration: 200, easing: cubicIn }}
		use:clickOutside
		onclickoutside={close}
	>
		<TheComponent closePopover={close} {...content.props} />
	</div>
{/if}
