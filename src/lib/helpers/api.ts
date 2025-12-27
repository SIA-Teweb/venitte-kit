import { BASE_API_URI } from '$lib/constants/uri';
import type { Variant } from '$lib/types/cart';
import { type Category } from '$lib/types/categories';
import type { LocationResponse } from '$lib/types/location';
import { type DeliveryResponse, type DeliveryPayload, type OrderResponse } from '$lib/types/orders';
import { type PageResponse } from '$lib/types/pages';
import { type ProductSingle, type ProductResponse } from '$lib/types/products';

// #region  General Fetch functions

export async function post<T>(url: string, payload: object): Promise<T> {
	const response = await fetch(BASE_API_URI + url, {
		method: 'POST',
		body: JSON.stringify(payload)
	});

	if (!response.ok) {
		throw response.status;
	}

	return response.json();
}

export async function get<T>(url: string): Promise<T> {
	const response = await fetch(BASE_API_URI + url, {
		method: 'GET'
	});

	if (!response.ok) {
		throw response.status;
	}

	return response.json();
}

// #region API

const productsQuery = <T = unknown>(body: Record<string, unknown>) =>
	post<T>('/shop/categories/products', body);

export const api = {
	products: {
		new: () => productsQuery({ limit: 6 }),
		special: () => productsQuery({ limit: 12, specialOffer: true }),
		get: (slug: string) => get<ProductSingle>(`/shop/products/view/${slug}`),
		getByIds: (ids: number[]) => productsQuery<ProductResponse>({ ids }),
		getByCategory: (categoryId: number, filters: object) =>
			productsQuery<ProductResponse>({ categoryId, ...filters }),
		getBySearch: (searchString: string) =>
			get<ProductResponse>(`/shop/products/search/${searchString}`)
	},
	categories: {
		get: () => get<Category>('/categories/categories/tree'),
		getFilters: (categoryId: number) => get(`/shop/categories/filters/${categoryId}`)
	},
	variants: {
		get: (variantIds: number[]) =>
			post<Variant[]>('/shop/variants/many', garbageVariationsPayload(variantIds))
	},
	orders: {
		getSettings: () => get('/shop/settings'),
		getDeliveryData: (payload: DeliveryPayload) =>
			post<DeliveryResponse>('/shop/orders/previewdelivery', payload),
		checkOrder: (payload: { code: string; email: string }) =>
			post<OrderResponse>('/shop/orders/view', payload)
	},
	pages: {
		get: (slug: string) => post<PageResponse>('/pages/pages/first', garbagePagePayload(slug))
	},
	location: {
		get: () => get<LocationResponse>('/security/info/location')
	}
};

const garbagePagePayload = (slug: string) => ({
	conditions: [
		{
			field: 'link',
			negative: false,
			operator: 'equal',
			value: slug
		}
	],
	fields: 'all',
	related: [
		{
			relatedField: 'name',
			related: [
				{
					relatedField: 'translations',
					fields: 'all',
					related: [
						{
							relatedField: 'language'
						}
					],
					selection: {
						groupBy: 'language.code',
						limit: 20,
						offset: 0,
						order: 'desc',
						sortBy: 'id'
					}
				}
			]
		},
		{
			relatedField: 'text',
			related: [
				{
					relatedField: 'translations',
					fields: 'all',
					related: [
						{
							relatedField: 'language'
						}
					],
					selection: {
						groupBy: 'language.code',
						limit: 20,
						offset: 0,
						order: 'desc',
						sortBy: 'id'
					}
				}
			]
		}
	]
});

const garbageVariationsPayload = (variantIds: number[]) => ({
	conditions: [
		{
			field: 'id',
			negative: false,
			operator: 'equal',
			value: variantIds
		}
	],
	deleted: false,
	fields: ['id', 'amount'],
	related: [
		{
			fields: ['id'],
			relatedField: 'options',
			related: [
				{
					fields: ['value'],
					relatedField: 'value',
					related: [
						{
							relatedField: 'name',
							related: [
								{
									relatedField: 'translations',
									fields: 'all',
									related: [
										{
											relatedField: 'language'
										}
									],
									selection: {
										groupBy: 'language.code',
										limit: 20,
										offset: 0,
										order: 'desc',
										sortBy: 'id'
									}
								}
							]
						}
					]
				},
				{
					fields: ['id'],
					relatedField: 'attribute',
					related: [
						{
							relatedField: 'name',
							related: [
								{
									relatedField: 'translations',
									fields: 'all',
									related: [
										{
											relatedField: 'language'
										}
									],
									selection: {
										groupBy: 'language.code',
										limit: 20,
										offset: 0,
										order: 'desc',
										sortBy: 'id'
									}
								}
							]
						}
					]
				}
			]
		},
		{
			fields: ['price', 'specialPrice'],
			relatedField: 'versions',
			selection: {
				groupBy: null,
				limit: 1,
				offset: 0,
				order: 'desc',
				sortBy: 'id'
			}
		},
		{
			fields: ['model', 'link', 'id'],
			relatedField: 'product',
			related: [
				{
					fields: ['name'],
					relatedField: 'brand'
				},
				{
					fields: 'all',
					relatedField: 'images',
					selection: {
						groupBy: null,
						limit: 1,
						offset: 0,
						order: 'asc',
						sortBy: 'order'
					},
					related: [
						{
							fields: null,
							relatedField: 'image',
							related: [
								{
									fields: ['link'],
									relatedField: 'dbFile'
								}
							]
						}
					]
				}
			]
		}
	]
});
