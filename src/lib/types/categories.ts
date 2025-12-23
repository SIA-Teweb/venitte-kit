import type { CategoriesFiltersEnum } from '$lib/enums/categories';
import type { Translation } from './translations';

export interface Category {
	id: number;
	link: string;
	keywords: Translation;
	name: Translation;
	children: Category[];
}

type Brand = {
	name: string;
	id: number;
};

export interface AvaliableFiltersResponse {
	brands: Brand[];
	minPrice: number;
	maxPrice: number;
}

export type CategoriesFiltersPayload = {
	[CategoriesFiltersEnum.page]?: number;
	[CategoriesFiltersEnum.sort]?: {
		by: string;
		order: boolean;
	};
	[CategoriesFiltersEnum.fromPrice]?: number;
	[CategoriesFiltersEnum.toPrice]?: number;
	[CategoriesFiltersEnum.brands]?: number[];
};

export type FilterEntry = {
	[K in CategoriesFiltersEnum]?: unknown;
};
