import { api } from '$lib/helpers/api';
import { cartStore } from '$lib/stores/cart';
import { get } from 'svelte/store';

export async function load() {
	const cartItems = get(cartStore);

	if (cartItems.length === 0) {
		return {};
	}

	return {
		variantsPromise: api.variants.get(cartItems.map((item) => item.variantId)),
		settingsPromise: api.orders.getSettings()
	};
}
