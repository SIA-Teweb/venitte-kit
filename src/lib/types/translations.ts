export interface Translation {
	[prop: string]: string;
}
type TranslationsByLocale = Record<string, Translation>;

export interface GroupedTranslation {
	translations: TranslationsByLocale;
}
