import { api } from '$lib/helpers/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, isDataRequest, locals }) => {
	const productPromise = api.products.get(params.slug);

	return {
		product: isDataRequest ? productPromise : await productPromise,
		location: locals.location
	};
};
