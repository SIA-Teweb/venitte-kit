import { browser } from '$app/environment';

export const isMobileScreen = () => {
	if (browser) {
		return window.matchMedia('(max-width: 640px)').matches;
	}
};

export function scrollLocker(locked: boolean) {
	if (!browser) {
		return;
	}

	if (locked) {
		document.body.style.cssText = `
			overflow:hidden;
			position:fixed;
			left: 0;
			right: 0;
			top: -${window.scrollY}px;
		`;
		window.scrollTo(0, 1);
		return;
	}

	const savedScrollPsn = document.body.style.top;
	document.body.removeAttribute('style');
	window.scrollTo(0, parseInt(savedScrollPsn || '0') * -1);
}
