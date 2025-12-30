<script lang="ts">
	import { clickOutside } from '$lib/helpers/events';
	import { closeDialog, dialogs } from '$lib/stores/dialogs';
	import { t } from '$lib/translations';
	import { XIcon } from '@lucide/svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
</script>

{#each $dialogs as dialog (dialog.id)}
	{@const Icon = dialog.icon}
	{@const TheComponent = typeof dialog.content !== 'string' ? dialog.content.component : undefined}
	<div
		class="fixed inset-0 z-50 bg-surface-50/50 backdrop-blur-xs will-change-auto backface-hidden transform-gpu"
		transition:fade={{ duration: 300 }}
		onclickcapture={() => closeDialog(dialog.id)}
	></div>
	<div
		class="fixed right-4 z-50 rounded-xl bottom-0 left-4 mx-auto mb-4 max-w-sm space-y-4 card bg-surface-50 p-4 md:p-6 shadow-xl dark:bg-surface-900"
		transition:fly={{ y: 200, duration: 300, easing: cubicOut }}
	>
		<header class="flex items-center justify-between">
			<div class="flex items-center gap-2">
				{#if Icon}
					<Icon />
				{/if}
				<span class="text-lg font-bold">
					{$t(dialog.title)}
				</span>
			</div>
			<button type="button" class="btn-icon preset-tonal" onclick={() => closeDialog(dialog.id)}>
				<XIcon />
			</button>
		</header>
		<article class="hide-scroll">
			{#if typeof dialog.content === 'string'}
				{dialog.content}
			{:else}
				<TheComponent
					{...dialog.content.props!}
					{...dialog.content.getProps?.()!}
					closeDialog={() => closeDialog(dialog.id)}
				/>
			{/if}
		</article>
	</div>
{/each}
