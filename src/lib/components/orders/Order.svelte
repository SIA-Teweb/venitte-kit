<script lang="ts">
	import SkeletonOrder from './SkeletonOrder.svelte';

	let { orderPromise } = $props();
</script>

{#await orderPromise}
	<SkeletonOrder />
{:then order}
	<div>{order.code}</div>
{/await}
