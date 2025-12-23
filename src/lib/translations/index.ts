import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/state';
import { LOCALE_STORAGE_KEY } from '$lib/constants/storage';
import storage from '$lib/helpers/storage';
import { get } from 'svelte/store';
import I18n, { type Config } from 'sveltekit-i18n';

const supportedLocales = ['en', 'lv', 'ru'];
const keys = ['common', 'description', 'errors', 'keywords', 'shop'];

const supportedLocalesOptions = supportedLocales.flatMap((locale) =>
	keys.map((theKey) => ({
		value: locale,
		key: theKey,
		import: async () => (await import(`./${locale}/${theKey}.json`)).default
	}))
);

const config: Config<{ [prop: string]: string }> = {
	loaders: supportedLocalesOptions.map((locale) => ({
		locale: locale.value,
		key: locale.key,
		loader: locale.import
	})),
	fallbackLocale: 'en'
};

export function getLocale(url?: URL, fallback = 'lv'): string {
	if (browser) {
		const savedLocale = storage.get<string>(LOCALE_STORAGE_KEY);
		if (savedLocale) return savedLocale;
	}

	if (url) {
		const pathLocale = url.pathname.split('/')[1];
		if (supportedLocales.includes(pathLocale)) return pathLocale;
	}

	return get(locale) ?? fallback;
}

export function setLocale(newLocale: string) {
	if (newLocale && newLocale !== get(locale) && supportedLocales.includes(newLocale)) {
		locale.set(newLocale);
		storage.set(LOCALE_STORAGE_KEY, newLocale);
		const parts = page.url.pathname.split('/').filter(Boolean);
		parts[0] = newLocale;
		// eslint-disable-next-line svelte/no-navigation-without-resolve
		return goto('/' + parts.join('/'), { replaceState: true });
	}
}

export const { t, locale, locales, loading, loadTranslations } = new I18n(config);
