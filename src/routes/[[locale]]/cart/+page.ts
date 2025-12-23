import { api } from '$lib/helpers/api';
import { cartStore } from '$lib/stores/cart';
import { formValues } from '$lib/stores/forms';
import { get } from 'svelte/store';

export async function load() {
	const cartItems = get(cartStore);
	const { country, postcode } = get(formValues);

	if (cartItems.length === 0) {
		return {};
	}

	return {
		variantsPromise: api.variants.get(cartItems.map((item) => item.variantId)),
		deliveryPromise: api.orders.getDeliveryData({
			country: country,
			deliveryType: '',
			postcode: postcode,
			items: cartItems
		})
	};
}
