import { WISH_LIST_STORAGE_KEY } from '$lib/constants/storage';
import storage from '$lib/helpers/storage';
import { writable } from 'svelte/store';

export function restoreWishList() {
	const savedWishList = storage.get<number[]>(WISH_LIST_STORAGE_KEY);
	return savedWishList;
}

export const wishListStore = (() => {
	const { subscribe, set, update } = writable<Array<number>>(restoreWishList() ?? []);

	function add(id: number) {
		wishListStore.update((items) => [id, ...items]);
	}

	function remove(id: number) {
		wishListStore.update((items) => items.filter((item) => item !== id));
	}

	return {
		subscribe,
		set,
		update,
		add,
		remove
	};
})();
