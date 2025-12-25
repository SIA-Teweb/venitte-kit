import { writable } from 'svelte/store';

export const lastShopLinkStore = writable<URL>(undefined);
export const previousUrl = writable<URL>(undefined);
