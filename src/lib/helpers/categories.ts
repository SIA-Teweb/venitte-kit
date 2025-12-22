import type { Category } from '$lib/types/categories';

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

enum CategoriesFiltersEnum {
	page = 'page',
	sort = 'sort'
}

type CategoriesFiltersPayload = {
	[CategoriesFiltersEnum.page]?: number;
	[CategoriesFiltersEnum.sort]?: {
		by: string;
		order: boolean;
	};
};

type FilterEntry = {
	[K in CategoriesFiltersEnum]?: unknown;
};

export function generateCategoriesUrl(url: URL, filters: FilterEntry) {
	for (const [key, value] of Object.entries(filters)) {
		if (!value) continue;

		url.searchParams.set(key, JSON.stringify(value));
	}
}

export function parseKey(url: URL, key: typeof CategoriesFiltersEnum) {
	console.log(url, key);
}

export function parseCategoriesUrl(url: URL) {
	const payload: CategoriesFiltersPayload = {};

	url.searchParams.forEach((value, key) => {
		const parsedValue = JSON.parse(value);

		if (key === CategoriesFiltersEnum.sort) {
			const [by, order] = parsedValue.split('.');

			payload[key] = {
				by,
				order: order === 'asc'
			};

			return;
		}

		if (key === CategoriesFiltersEnum.page) {
			payload.page = Number(parsedValue);

			return;
		}
	});

	return payload;
}
