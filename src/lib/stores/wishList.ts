import { restoreWishList } from '$lib/helpers/wishList';
import { writable } from 'svelte/store';

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
