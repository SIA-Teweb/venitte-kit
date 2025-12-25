import type { OrderItemStatusEnum, OrderStatusEnum } from '$lib/enums/orders';
import type { CartItem } from './cart';
import type { Image } from './general';

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

interface OrderResponseItemOption {
	name: { [lang: string]: string };
	value: string | number;
}

export interface OrderResponseItem {
	name: string;
	amount: 1;
	price: number;
	status: OrderItemStatusEnum;
	image: Image;
	options: OrderResponseItemOption[];
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
	status: OrderStatusEnum;
	totalPrice: number;
}
