export const ROUTES = {
	HOME: '/',
	WISHLIST: '/wishlist',
	CART: '/cart',
	PRODUCT: '/product',
	SHOP: '/shop',
	PAGE: '/pages'
} as const;

export function route(path: string, locale: string) {
	return `/${locale}${path}`;
}
