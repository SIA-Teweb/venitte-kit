import { isMobileScreen } from '$lib/helpers/device';
import { createToaster } from '@skeletonlabs/skeleton-svelte';

export const toaster = createToaster({
	placement: isMobileScreen() ? 'top' : 'bottom-end',
	duration: 5000
});
