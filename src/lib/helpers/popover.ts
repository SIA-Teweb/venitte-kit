import Popover from '$lib/components/widgets/Popover.svelte';
import type { PopoverInitProps } from '$lib/types/widgets';
import { mount, unmount } from 'svelte';

let instance: Record<string, Popover> | null = null;

export function openPopover<T>(data: PopoverInitProps<T>) {
	if (instance) {
		unmount(instance, { outro: true });
		instance = null;
	}

	const rect = data.target.getBoundingClientRect();
	const x = (rect.left + rect.right) / 2 + window.pageXOffset;
	const y = rect.bottom + window.pageYOffset;

	instance = mount(Popover, {
		target: data.target.parentElement as HTMLElement,
		props: {
			x,
			y,
			width: data.width === 'parent' ? `${rect.right - rect.left}px` : undefined,
			content: data.content,
			onClose: data.onClose
		}
	});
}

export async function closePopover() {
	if (!instance) return;
	await unmount(instance, { outro: true });
	instance = null;
}
