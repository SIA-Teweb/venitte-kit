import { browser } from '$app/environment';

export const isMobileScreen = () => {
	if (browser) {
		return window.matchMedia('(max-width: 640px)').matches;
	}
};
