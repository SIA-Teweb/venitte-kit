<script>
	import { addToWishList, removeFromWishList } from '$lib/helpers/wishList';
	import { wishListStore } from '$lib/stores/wishList';
	import { Heart } from '@lucide/svelte';
	import { backOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	let { id } = $props();

	const isActive = $derived($wishListStore.includes(id));
</script>

<button
	class="btn preset-tonal"
	onclick={() => (isActive ? removeFromWishList(id) : addToWishList(id))}
>
	{#if isActive}
		<div in:scale={{ duration: 300, easing: backOut }}>
			<Heart fill="var(--color-tertiary-600)" color="var(--color-tertiary-600)" />
		</div>
	{:else}
		<div in:scale={{ duration: 300, easing: backOut }}>
			<Heart />
		</div>
	{/if}
</button>
