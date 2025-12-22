<script lang="ts">
	import { Search } from '@lucide/svelte';
	import Input from '../ui/Input.svelte';
	import { t } from '$lib/translations';
	import type { ProductResponse } from '$lib/types/products';
	import { api } from '$lib/helpers/api';
	import { openPopover } from '$lib/helpers/popover';
	import SearchBarResults from './SearchBarResults.svelte';
	import { writable, type Writable } from 'svelte/store';

	let searchString = $state('');
	let timer: ReturnType<typeof setTimeout>;
	const productsPromise: Writable<Promise<ProductResponse> | undefined> = writable(undefined);
	let isPopoverOpen: boolean = false;
	let inputRef: HTMLElement | undefined = $state(undefined);

	function searchItems() {
		clearTimeout(timer);

		timer = setTimeout(() => {
			productsPromise.set(api.products.getBySearch(searchString));
		}, 400);
	}

	function onSearchFocus(event: Event) {
		if (!isPopoverOpen) {
			openPopover<typeof SearchBarResults>({
				target: inputRef ?? (event.currentTarget as HTMLElement),
				width: 'parent',
				content: {
					component: SearchBarResults,
					props: {
						productsPromise: productsPromise
					}
				},
				onClose: () => {
					isPopoverOpen = false;
				}
			});

			isPopoverOpen = true;
		}
	}
</script>

<Input
	bind:value={searchString}
	icon={Search}
	placeholder={$t('shop.searchProducts')}
	full
	bind:ref={inputRef}
	oninput={searchItems}
	onclick={onSearchFocus}
/>
