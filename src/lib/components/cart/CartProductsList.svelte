<script lang="ts">
	import { cartStore } from '$lib/stores/cart';
	import type { Variant } from '$lib/types/cart';
	import { flip } from 'svelte/animate';
	import CartProduct from './CartProduct.svelte';

	let { variants }: { variants: Variant[] } = $props();
</script>

<div class="flex flex-col gap-4">
	{#each $cartStore as cartItem (cartItem.variantId)}
		{@const variant = variants.find((variant) => variant.id === cartItem.variantId)}
		<div animate:flip={{ duration: 200 }}>
			{#if variant}
				<CartProduct {variant} {cartItem} />
			{/if}
		</div>
	{/each}
</div>
