import { api } from '$lib/helpers/api';
import { findCategoryByPath, parseCategoriesUrl } from '$lib/helpers/categories';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PRODUCTS_PAGE_SIZE } from '$lib/constants/other';

export const load: PageServerLoad = async ({ isDataRequest, params, locals, url }) => {
	const segments = params.category?.split('/') ?? [];

	const { current, parent, trail } = findCategoryByPath(locals.categories, segments);

	if (!current) {
		throw error(404, 'Category not found');
	}

	const categoryProductsPromise = api.products.getByCategory(current.id, {
		limit: PRODUCTS_PAGE_SIZE,
		...parseCategoriesUrl(url)
	});

	return {
		current,
		parent,
		trail,
		products: isDataRequest ? categoryProductsPromise : await categoryProductsPromise,
		avaliableFilters: api.categories.getFilters(current.id)
	};
};
