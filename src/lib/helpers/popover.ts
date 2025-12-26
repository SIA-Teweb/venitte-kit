import type { PopoverInitProps } from '$lib/types/widgets';
import { mount, unmount } from 'svelte';
import Popover from '$lib/components/widgets/Popover.svelte';

type PopoverInstance = {
	id: string;
	component: object;
	target: HTMLElement;
};

const popovers: PopoverInstance[] = [];

export function openPopover<T>(data: PopoverInitProps<T>) {
	if (popovers.find((p) => p.target === data.target)) {
		return;
	}

	const target = data.target;
	const id = crypto.randomUUID();

	target.classList.add('relative', 'z-20');

	const instance = mount(Popover, {
		target: data.target,
		props: {
			...data,
			close: () => closePopover(id)
		}
	});

	popovers.push({ id, component: instance, target });
}

export function closePopover(id?: string) {
	if (!id) {
		if (popovers.length === 0) return;
		id = popovers[popovers.length - 1].id;
	}

	const index = popovers.findIndex((p) => p.id === id);
	if (index === -1) return;

	const { component, target } = popovers[index];

	unmount(component, { outro: true });

	setTimeout(() => {
		const isTargetUsedByOther = popovers.some((p) => p.target === target && p.id !== id);
		if (!isTargetUsedByOther) {
			target.classList.remove('relative', 'z-20');
		}
	}, 200);

	popovers.splice(index, 1);
}

export function closeAllPopovers() {
	while (popovers.length > 0) {
		closePopover();
	}
}
