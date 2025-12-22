import type { Product } from './products';
import type { GroupedTranslation } from './translations';

export interface CartItem {
	variantId: number;
	amount: number;
}

interface VariantVersion {
	price: number;
	specialPrice: number;
}

interface VariantProduct extends Omit<Product, 'brand'> {
	brand: {
		name: string;
	};
	images: {
		image: {
			dbFile: {
				link: string;
			};
		};
	}[];
}

interface VariantOptionValue {
	value: number;
	id: number;
	nameId: number;
}

interface VariantOptionAttribute {
	id: number;
	name: GroupedTranslation;
}

interface VariantOption {
	id: number;
	variantId: number;
	valueId: number;
	value: VariantOptionValue;
	attribute: VariantOptionAttribute;
}

export interface Variant {
	id: number;
	amount: number;
	productId: number;
	versions: VariantVersion[];
	product: VariantProduct;
	options: VariantOption[];
}
