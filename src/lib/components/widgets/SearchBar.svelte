<script lang="ts">
	import { Search } from '@lucide/svelte';
	import Input from '../ui/Input.svelte';
	import { t } from '$lib/translations';
	import type { ProductResponse } from '$lib/types/products';
	import { api } from '$lib/helpers/api';
	import { openPopover } from '$lib/helpers/popover';
	import SearchBarResults from './SearchBarResults.svelte';
	import { writable, type Writable } from 'svelte/store';

	let { onClosePopover = undefined } = $props();

	let searchString = $state('');
	let timer: ReturnType<typeof setTimeout>;
	const productsPromise: Writable<Promise<ProductResponse> | undefined> = writable(undefined);
	let inputRef: HTMLElement | undefined = $state(undefined);

	function searchItems() {
		clearTimeout(timer);

		timer = setTimeout(() => {
			productsPromise.set(api.products.getBySearch(searchString));
		}, 400);
	}

	function onSearchFocus(event: Event) {
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
				onClosePopover?.();
			}
		});
	}
</script>

<Input
	type="search"
	bind:value={searchString}
	class="rounded-xl"
	icon={Search}
	placeholder={$t('shop.searchProducts')}
	bind:ref={inputRef}
	oninput={searchItems}
	onclick={onSearchFocus}
	full
/>
