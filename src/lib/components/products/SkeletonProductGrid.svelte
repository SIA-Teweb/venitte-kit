<script>
	import SkeletonProductCard from './SkeletonProductCard.svelte';

	let { count } = $props();
</script>

<div class="grid md:grid-cols-3 lg:grid-cols-6 grid-cols-2 gap-4">
	{#each Array(count) as _}
		<SkeletonProductCard />
	{/each}
</div>
