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

interface OrderResponseItem {
	id: number;
}

export interface OrderResponse {
	address: string;
	city: string;
	code: string;
	comment: string;
	country: string;
	createdAt: string;
	deliveryDestination: string;
	deliveryPrice: number;
	deliveryType: null;
	email: string;
	firstname: string;
	items: OrderResponseItem[];
	lastname: string;
	onlinePayment: boolean;
	paid: boolean;
	paymentApi: string;
	phone: string;
	postcode: string;
	promocode: string;
	promocodePriceReduction: number;
	rulesAgreed: true;
	status: string;
	totalPrice: number;
}
