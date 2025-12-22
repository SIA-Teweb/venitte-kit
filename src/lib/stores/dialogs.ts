import type { DialogInitProps, DialogProps } from '$lib/types/widgets';
import { writable, type Writable } from 'svelte/store';

export function createDialog(data: DialogInitProps) {
	dialogs.update((items) => {
		const randomId = crypto.randomUUID();

		const newDialog: DialogProps<unknown> = {
			id: randomId,
			title: data.title,
			content:
				typeof data.content === 'string'
					? data.content
					: {
							component: data.content.component,
							props: {
								...data.content.props!,
								closeDialog: () => closeDialog(randomId)
							}
						},
			icon: data.icon
		};
		return [...items, newDialog];
	});
}

export function closeDialog(id: string) {
	dialogs.update((items) => items.filter((item) => item.id !== id));
}

export function closeAllDialogs() {
	dialogs.set([]);
}

const dialogs: Writable<DialogProps<unknown>[]> = writable([]);

export { dialogs };
