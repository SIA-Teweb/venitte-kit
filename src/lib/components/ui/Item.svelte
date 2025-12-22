<script lang="ts">
	let { icon, label, value } = $props();

	const Icon = $derived(icon);
</script>

<div class="flex gap-2 items-center">
	{#if icon}
		<div class="preset-tonal rounded-full p-2">
			<Icon size={24} />
		</div>
	{/if}
	<div class="flex flex-col gap-0.5">
		<span class="text-xs font-normal leading-none">{label}</span>
		<span class="text-base font-medium leading-none">{value}</span>
	</div>
</div>
