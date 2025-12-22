import { writable, derived } from 'svelte/store';
import type { CartItem } from '$lib/types/cart';

function createCartStore() {
	const items = writable<CartItem[]>([]);

	const count = derived(items, ($items) => $items.length);

	function add(product: CartItem) {
		items.update((products) => [product, ...products]);
	}

	function remove(variantId: number) {
		items.update((products) => products.filter((product) => product.variantId !== variantId));
	}

	function increaseAmount(variantId: number) {
		items.update((products) =>
			products.map((product) =>
				product.variantId === variantId ? { ...product, amount: product.amount + 1 } : product
			)
		);
	}

	function decreaseAmount(variantId: number) {
		items.update((products) =>
			products.map((product) =>
				product.variantId === variantId && product.amount > 1
					? { ...product, amount: product.amount - 1 }
					: product
			)
		);
	}

	return { ...items, add, remove, increaseAmount, decreaseAmount, count };
}

export const cartStore = createCartStore();
