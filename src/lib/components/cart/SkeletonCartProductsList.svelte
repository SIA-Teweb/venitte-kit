<script lang="ts">
	let { itemsCount } = $props();
</script>

<div class="flex flex-col gap-2">
	{#each Array(itemsCount) as _}
		<div class="w-full placeholder animate-pulse h-32"></div>
	{/each}
</div>
