<script lang="ts">
	import Button from '../ui/Button.svelte';
	import { XIcon } from '@lucide/svelte';
	import { sidebarStore } from '$lib/stores/sidebar';
	import { fade, fly } from 'svelte/transition';
</script>

{#each $sidebarStore as sideBar}
	{@const sideClass = sideBar.side === 'right' ? 'right-0 border-l' : 'left-0 border-r'}
	{@const TheComponent = sideBar.content.component ?? undefined}
	<div
		class="fixed z-40 top-0 bottom-0 left-0 right-0 backdrop-blur-sm"
		transition:fade
		onclickcapture={sideBar.close}
	></div>
	<div
		class="z-50 bg-surface-50 md:max-w-[400px] min-w-[300px] max-w-[70dvw] h-full p-4 flex flex-col gap-4 fixed top-0 bottom-0 {sideClass} border-surface-200-800"
		transition:fly={{ x: sideBar.side === 'right' ? 200 : -200 }}
	>
		<div class="flex gap-4 justify-between">
			<h3 class="text-lg font-semibold">{sideBar.title}</h3>
			<Button
				preset="tonal"
				icon={XIcon}
				onclick={() => {
					sideBar.close();
				}}
			/>
		</div>
		{#if TheComponent}
			<TheComponent {...sideBar.content.props ?? {}} closeSidebar={sideBar.close} />
		{/if}
	</div>
{/each}
