import { api } from '$lib/helpers/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ isDataRequest, params }) => {
	const pagePromise = api.pages.get(params.slug);

	return {
		streamed: {
			pagePromise: isDataRequest ? pagePromise : await pagePromise
		}
	};
};
