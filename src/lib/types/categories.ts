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
