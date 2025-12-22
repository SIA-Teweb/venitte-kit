import { wishListStore } from '$lib/stores/wishList';
import { get } from 'svelte/store';
import storage from './storage';

const WISH_LIST_STORAGE_KEY = 'wishList';

export function restoreWishList() {
	const savedWishList = storage.get<number[]>(WISH_LIST_STORAGE_KEY);
	if (savedWishList) wishListStore.set(savedWishList);
}

export function addToWishList(id: number) {
	wishListStore.add(id);
	storage.set(WISH_LIST_STORAGE_KEY, get(wishListStore));
}

export function removeFromWishList(id: number) {
	wishListStore.remove(id);
	storage.set(WISH_LIST_STORAGE_KEY, get(wishListStore));
}
