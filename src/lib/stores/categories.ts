import { type Category } from '$lib/types/categories';
import { writable } from 'svelte/store';

export const categoriesStore = writable<Category[]>([]);
