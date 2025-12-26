<script lang="ts">
	let { icon, label = undefined, value } = $props();

	const Icon = $derived(icon);
</script>

<div class="flex gap-4 items-center">
	{#if icon}
		<div class="rounded-full">
			<Icon size={!label ? 20 : 24} />
		</div>
	{/if}
	<div class="flex flex-col gap-0.5">
		{#if label}
			<span class="text-xs font-normal leading-none">{label}</span>
		{/if}
		<span class="text-base font-medium leading-5">{value}</span>
	</div>
</div>
