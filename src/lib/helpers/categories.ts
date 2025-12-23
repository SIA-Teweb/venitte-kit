import { CategoriesFiltersEnum } from '$lib/enums/categories';
import type { Category, FilterEntry } from '$lib/types/categories';

// Finds category from CategoryTree by URL's paths
export function findCategoryByPath(
	roots: Category[],
	segments: string[]
): { current: Category | null; parent: Category | null; trail: Category[] } {
	let currentList = roots;
	let parent: Category | null = null;
	const trail: Category[] = [];

	for (const segment of segments) {
		const next = currentList.find((c) => c.link === segment);
		if (!next) break;

		trail.push(next);
		parent = trail.length > 1 ? trail[trail.length - 2] : null;
		currentList = next.children;
	}

	const current = trail.at(-1) ?? null;
	return { current, parent, trail };
}

// Parsing string to number[]
export function parseNumberArrayJson(s: string): number[] {
	if (!Array.isArray(s)) return [];
	return s.map(Number).filter(Number.isFinite);
}

// Parsers for different keys
const filterParsers = {
	[CategoriesFiltersEnum.page]: (raw: string) => Number(JSON.parse(raw)),
	[CategoriesFiltersEnum.fromPrice]: (raw: string) => Number(JSON.parse(raw)),
	[CategoriesFiltersEnum.toPrice]: (raw: string) => Number(JSON.parse(raw)),
	[CategoriesFiltersEnum.brands]: (raw: string) => parseNumberArrayJson(JSON.parse(raw)),
	[CategoriesFiltersEnum.sort]: (raw: string) => {
		const [by, order] = String(JSON.parse(raw)).split(':');
		return { by, order: order === 'asc' };
	}
} satisfies Record<CategoriesFiltersEnum, (raw: string) => unknown>;

type Parsers = typeof filterParsers;

export type CategoriesFiltersPayload = Partial<{
	[K in keyof Parsers]: ReturnType<Parsers[K]>;
}>;

function isParserKey(key: string): key is keyof Parsers {
	return key in filterParsers;
}

function entry<K extends keyof Parsers>(key: K, raw: string): Pick<CategoriesFiltersPayload, K> {
	return { [key]: filterParsers[key](raw) } as Pick<CategoriesFiltersPayload, K>;
}

export function parseCategoriesUrl(url: URL): CategoriesFiltersPayload {
	let payload: CategoriesFiltersPayload = {};

	url.searchParams.forEach((value, key) => {
		if (!isParserKey(key)) return;
		payload = { ...payload, ...entry(key, value) };
	});

	return payload;
}

// Generating categories url
export function generateCategoriesUrl(url: URL, filters: FilterEntry) {
	for (const [key, value] of Object.entries(filters)) {
		if (!value) continue;

		url.searchParams.set(key, JSON.stringify(value));
	}
}
