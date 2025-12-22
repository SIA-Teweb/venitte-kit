import storage from '$lib/helpers/storage';
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

export const { t, locale, locales, loading, loadTranslations } = new I18n(config);

locale.subscribe((newLocale) => {
	storage.set('locale', newLocale);
});
