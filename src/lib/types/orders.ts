import type { CartItem } from './cart';

export interface DeliveryPayload {
	country: string;
	deliveryType: string;
	postcode: string;
	items: CartItem[];
}

export interface DeliveryResponse {
	from: string;
	to: string;
	price: number;
}
