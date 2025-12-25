import type { PopoverInitProps } from '$lib/types/widgets';
import { mount, unmount } from 'svelte';
import { scrollLocker } from './layout';
import Popover from '$lib/components/widgets/Popover.svelte';

let popoverInstance: Record<string, Popover> | undefined = undefined;
let target: HTMLElement | undefined = undefined;

export function openPopover<T>(data: PopoverInitProps<T>) {
	if (popoverInstance || target) {
		return;
	}

	target = data.target;
	target.classList.add('relative', 'z-20');

	popoverInstance = mount(Popover, {
		target: data.target,
		props: { ...data, close: closePopover }
	});

	scrollLocker(true);
}

export function closePopover() {
	if (popoverInstance) {
		unmount(popoverInstance, { outro: true });
		popoverInstance = undefined;
		setTimeout(() => {
			target?.classList.remove('relative', 'z-20');
			target = undefined;
		}, 200);
	}
	scrollLocker(false);
}
