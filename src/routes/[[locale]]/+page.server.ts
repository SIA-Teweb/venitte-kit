import { api } from '$lib/helpers/api';
import type { PageServerLoad } from './[locale]/$types';

export const load: PageServerLoad = async ({ isDataRequest }) => {
	const newProductsPromise = api.products.new();
	const specialProductsPromise = api.products.special();

	return {
		newProducts: isDataRequest ? newProductsPromise : await newProductsPromise,
		specialProducts: isDataRequest ? specialProductsPromise : await specialProductsPromise
	};
};
