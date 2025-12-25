import { isMobileScreen } from '$lib/helpers/layout';
import { createToaster } from '@skeletonlabs/skeleton-svelte';

export const toaster = createToaster({
	placement: isMobileScreen() ? 'top' : 'bottom-end',
	duration: 5000
});
