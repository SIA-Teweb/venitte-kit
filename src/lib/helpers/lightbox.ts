import Lightbox from '$lib/components/widgets/Lightbox.svelte';
import type { LightboxProps } from '$lib/types/widgets';
import { mount, unmount } from 'svelte';
import { scrollLocker } from './layout';

let lightboxInstance: Record<string, Lightbox> | undefined = undefined;

export function createLightbox(data: LightboxProps) {
	const target = document.body;

	lightboxInstance = mount(Lightbox, {
		target,
		props: { ...data, close: destroyLightbox }
	});

	scrollLocker(true);
}

export function destroyLightbox() {
	if (lightboxInstance) {
		unmount(lightboxInstance, { outro: true });
		lightboxInstance = undefined;
	}
	scrollLocker(false);
}
