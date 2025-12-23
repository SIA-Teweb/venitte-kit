<script lang="ts">
	import { route, ROUTES } from '$lib/constants/routes';
	import { LoaderCircle } from '@lucide/svelte';
	import Image from '../ui/Image.svelte';
	import { t, locale } from '$lib/translations';
	import ProductPrice from '../products/ProductPrice.svelte';

	let { productsPromise } = $props();
</script>

{#if !$productsPromise}
	<span>{$t('shop.startTyping')}</span>
{/if}

{#await $productsPromise}
	<div class="w-full flex justify-center">
		<LoaderCircle class="animate-spin" />
	</div>
{:then productResponse}
	{#if productResponse?.total === 0}
		<span>{$t('shop.noSearchedItems')}</span>
	{/if}
	{#each productResponse?.products as product}
		<a
			href={`${route(ROUTES.PRODUCT, $locale)}/${product.link}`}
			class="flex hover:preset-tonal p-2 rounded-md gap-4 items-center"
		>
			<div class="h-12 w-12">
				<Image
					clases="aspect-square h-[50px] w-[50px] object-contain"
					src={product.image.thumbnails[1].link}
					alt="Product thumb"
				/>
			</div>
			<span class="grow">{product.brand} {product.model}</span>
			<ProductPrice
				priceObject={{
					maxPrice: product.maxPrice,
					minPrice: product.minPrice,
					price: product.price,
					specialPrice: product.specialPrice
				}}
			/>
		</a>
	{/each}
{:catch}
	<span>{$t('shop.startTyping')}</span>
{/await}
