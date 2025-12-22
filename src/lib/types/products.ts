import type { Image } from './general';
import type { Translation } from './translations';

export interface ProductResponse {
	total: number;
	products: Product[];
}

export interface Product {
	id: number;
	link: string;
	brand: string;
	model: string;
	price: number;
	minPrice: number;
	maxPrice: number;
	specialPrice: number;
	image: Image;
}

interface ProductVariantOption {
	attributeId: number;
	valueId: number;
}

export interface ProductVariant {
	id: number;
	ean: string;
	amount: number;
	price: number;
	specialPrice: number;
	options: ProductVariantOption[];
}

interface ProductSingleOptionValue {
	id: number;
	name?: string;
	order: number;
	value?: number;
}

export interface ProductSingleOption {
	id: number;
	measurementUnit: Translation;
	name: Translation;
	values: ProductSingleOptionValue[];
}

export interface ProductSingle extends Product {
	id: number;
	description: Translation;
	keywords: Translation;
	images: Image[];
	variants: ProductVariant[];
	options: ProductSingleOption[];
}

export interface PriceObjectProps {
	minPrice: number;
	maxPrice: number;
	specialPrice: number;
	price: number;
}
