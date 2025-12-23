import { wishListStore } from '$lib/stores/wishList';
import { get } from 'svelte/store';
import storage from './storage';
import { WISH_LIST_STORAGE_KEY } from '$lib/constants/storage';

export function addToWishList(id: number) {
	wishListStore.add(id);
	storage.set(WISH_LIST_STORAGE_KEY, get(wishListStore));
}

export function removeFromWishList(id: number) {
	wishListStore.remove(id);
	storage.set(WISH_LIST_STORAGE_KEY, get(wishListStore));
}
