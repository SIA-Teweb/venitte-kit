import { locale } from '$lib/translations';
import { get } from 'svelte/store';

export function toMoney(number: number, isRounded = false) {
	if (number !== undefined && typeof number === 'number') {
		return `€\u00A0${number.toFixed(isRounded ? 0 : 2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
	}
}

export const formatDateShort = (datetime: string | Date) =>
	new Date(datetime).toLocaleDateString(get(locale), { month: 'short', day: 'numeric' });
