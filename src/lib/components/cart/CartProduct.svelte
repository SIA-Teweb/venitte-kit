<script lang="ts">
	import { Minus, Plus, XIcon } from '@lucide/svelte';
	import Button from '../ui/Button.svelte';
	import Image from '../ui/Image.svelte';
	import { decreaseAmount, increaseAmount, removeFromCart } from '$lib/helpers/cart';
	import type { CartItem, Variant } from '$lib/types/cart';
	import { route, ROUTES } from '$lib/constants/routes';
	import { goto } from '$app/navigation';
	import ProductPrice from '../products/ProductPrice.svelte';
	import { locale } from '$lib/translations';

	let { variant, cartItem }: { variant: Variant; cartItem: CartItem } = $props();
	let totalPrice = $state(0);
	let totalSpecialPrice = $state(0);
	let price = $derived(Number(variant.versions[0].price));
	let specialPrice = $derived(Number(variant.versions[0].specialPrice));

	$effect(() => {
		totalPrice = cartItem.amount * price;
		totalSpecialPrice = cartItem.amount * specialPrice;
	});
</script>

<div class="flex gap-2 preset-bordered-card p-2">
	<button
		class="w-24"
		onclick={() => goto(route(`${ROUTES.PRODUCT}/${variant.product.link}`, $locale))}
	>
		<Image
			clases={'block aspect-square object-contain'}
			src={variant.product.images[0].image.dbFile.link}
			alt="Image thumbnail"
		/>
	</button>

	<div class="flex flex-col gap-2 w-full">
		<div class="flex items-center justify-between">
			<div class="text-lg">
				<span class="font-bold">{variant.product.brand.name}</span>
				<span>{variant.product.model}</span>
			</div>
			<Button preset="tonal" icon={XIcon} iconSized onclick={() => removeFromCart(variant?.id)} />
		</div>
		<div class="flex items-center gap-4 h-full">
			<div class="flex flex-col">
				{#each variant.options as option}
					<span>{option.attribute.name.translations[$locale].content}: {option.value.value}</span>
				{/each}
			</div>
			<div class="flex items-center gap-4">
				<Button
					preset="ghost"
					icon={Minus}
					iconSized
					onclick={() => decreaseAmount(variant.id)}
					disabled={1 >= cartItem.amount}
				/>
				<span>{cartItem.amount}</span>
				<Button
					preset="ghost"
					icon={Plus}
					iconSized
					disabled={variant.amount <= cartItem.amount}
					onclick={() => increaseAmount(variant.id)}
				/>
			</div>
			<ProductPrice
				priceObject={{
					minPrice: 0,
					maxPrice: 0,
					price,
					specialPrice
				}}
			/>
			{#if price !== totalPrice}
				<ProductPrice
					priceObject={{
						minPrice: 0,
						maxPrice: 0,
						price: totalPrice,
						specialPrice: totalSpecialPrice
					}}
				/>
			{/if}
		</div>
	</div>
</div>
