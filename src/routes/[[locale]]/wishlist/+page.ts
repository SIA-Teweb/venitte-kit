import { api } from '$lib/helpers/api';
import { wishListStore } from '$lib/stores/wishList';
import { get } from 'svelte/store';

export async function load() {
	const wishListItems = get(wishListStore);

	if (wishListItems.length === 0) {
		return {};
	}

	return {
		wishListPromise: api.products.getByIds(wishListItems)
	};
}
