import { cartStore } from '$lib/stores/cart';
import type { CartItem } from '$lib/types/cart';
import { get } from 'svelte/store';
import storage from './storage';
import { showErrorToast, showSuccessToast } from './toaster';
import { t } from '$lib/translations';

const CART_STORAGE_KEY = 'cart';

export function addToCart(variationId: number) {
	const cartProduct: CartItem = {
		variantId: variationId,
		amount: 1
	};

	const alreadyExist = get(cartStore).find((item) => item.variantId === variationId);

	if (alreadyExist) {
		return showErrorToast({
			description: get(t)('shop.alreadyExists')
		});
	}

	cartStore.add(cartProduct);
	storage.set(CART_STORAGE_KEY, get(cartStore));

	showSuccessToast({
		description: get(t)('shop.addedToCart')
	});
}

export function restoreCart() {
	const savedCart = storage.get<CartItem[]>(CART_STORAGE_KEY);
	return savedCart;
}

export function increaseAmount(variationId: number) {
	cartStore.increaseAmount(variationId);
	storage.set(CART_STORAGE_KEY, get(cartStore));
}

export function decreaseAmount(variationId: number) {
	cartStore.decreaseAmount(variationId);
	storage.set(CART_STORAGE_KEY, get(cartStore));
}

export function removeFromCart(variantId: number) {
	cartStore.remove(variantId);
	storage.set(CART_STORAGE_KEY, get(cartStore));
}
