// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Category } from '$lib/types/categories';
import type { LocationResponse } from '$lib/types/location';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			categories: Awaited<ReturnType<Category[]>>;
			location: LocationResponse;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module 'svelte/elements' {
	export interface HTMLAttributes {
		onclickoutside?: (event: CustomEvent<void>) => void;
	}
}

export {};
