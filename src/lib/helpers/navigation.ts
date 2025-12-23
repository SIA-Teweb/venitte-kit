import { browser } from '$app/environment';
import { replaceState } from '$app/navigation';
import { page } from '$app/state';

export function setQuery(key: string, value: string) {
	if (!browser) return;

	const url = new URL(page.url);
	url.searchParams.set(key, value);
	// eslint-disable-next-line svelte/no-navigation-without-resolve
	replaceState(url, page.state);
}

export function setQueryParam(key: string, value: string | null) {
	const url = new URL(page.url);

	if (value == null) url.searchParams.delete(key);
	else url.searchParams.set(key, value);

	// eslint-disable-next-line svelte/no-navigation-without-resolve
	replaceState(url, page.state);
}
