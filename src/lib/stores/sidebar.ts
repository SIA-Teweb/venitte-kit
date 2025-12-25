import { scrollLocker } from '$lib/helpers/layout';
import type { SideBarInitProps, SideBarProps } from '$lib/types/ui';
import { writable } from 'svelte/store';

export const sidebarStore = (() => {
	const { subscribe, set, update } = writable<SideBarProps[]>([]);

	function open(sideBar: SideBarInitProps) {
		sidebarStore.update((sideBars) => [
			...sideBars,
			{
				...sideBar,
				close: () => sidebarStore.close(sideBar.id)
			}
		]);
	}

	function close(id: string) {
		sidebarStore.update((sideBars) => sideBars.filter((sideBar) => sideBar.id !== id));
	}

	return {
		subscribe,
		set,
		update,
		open,
		close
	};
})();

sidebarStore.subscribe((current) => scrollLocker(current.length > 0));
