<script lang="ts">
	let { title, children } = $props();
</script>

<div class="preset-bordered-card flex flex-col gap-2 p-4 lg:grow shrink-0">
	<span class="text-lg font-semibold">{title}</span>
	{@render children?.()}
</div>
