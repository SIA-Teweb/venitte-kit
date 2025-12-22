import { writable } from 'svelte/store';

export const lastShopLinkStore = writable<URL>(undefined);
