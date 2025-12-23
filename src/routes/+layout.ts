import { browser } from '$app/environment';
import { getLocale, loadTranslations, locale } from '$lib/translations';
import { get } from 'svelte/store';

export const ssr = true;
export const csr = true;
export const prerender = true;

export async function load({ url, data }) {
	const initialLocale = getLocale(url);
	await loadTranslations(initialLocale);
	if (browser && !get(locale)) locale.set(initialLocale);

	return {
		...data
	};
}
