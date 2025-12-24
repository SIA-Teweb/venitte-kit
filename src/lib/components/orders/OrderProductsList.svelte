<script lang="ts">
	import OrderProduct from './OrderProduct.svelte';

	let { orderItems } = $props();
</script>

<div class="flex flex-col">
	{#each orderItems as orderItem}
		<OrderProduct {orderItem} />
	{/each}
</div>
