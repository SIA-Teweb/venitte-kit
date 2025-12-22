<script lang="ts">
	import { toaster } from '$lib/stores/toaster';
	import { Toast } from '@skeletonlabs/skeleton-svelte';
</script>

<Toast.Group {toaster}>
	{#snippet children(toast)}
		{@const Icon = toast.meta!.icon}
		<Toast {toast} class="rounded-2xl gap-2">
			{#if Icon}
				<Icon size={32} color={toast.meta!.color} />
			{/if}
			<Toast.Message class="flex flex-col gap-2">
				{#if toast.title}
					<Toast.Title class="font-bold">{toast.title}</Toast.Title>
				{/if}
				<Toast.Description>{toast.description}</Toast.Description>
			</Toast.Message>
			<Toast.CloseTrigger />
		</Toast>
	{/snippet}
</Toast.Group>
