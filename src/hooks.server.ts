import type { Handle } from '@sveltejs/kit';
import { api } from '$lib/helpers/api';

export const handle: Handle = async ({ event, resolve }) => {
	const categoryResponse = await api.categories.get();
	const locationResponse = await api.location.get();

	event.locals.categories = categoryResponse.children;
	event.locals.location = locationResponse;

	return resolve(event);
};
