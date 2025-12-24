<script lang="ts">
	let { orderItem } = $props();
</script>

<div class="preset-bordered-card p-4">
	<span>{orderItem.brand} {orderItem.model}</span>
</div>
