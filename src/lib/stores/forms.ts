import { FORMS_STORAGE_KEY } from '$lib/constants/storage';
import storage from '$lib/helpers/storage';
import { validator } from '@felte/validator-zod';
import { createForm } from 'felte';
import { get, writable } from 'svelte/store';
import { z } from 'zod';

export const formValues = writable<OrderFormValues>(
	storage.get<OrderFormValues>(FORMS_STORAGE_KEY) ?? {
		country: '',
		postcode: '',
		firstName: '',
		lastName: '',
		email: ''
	}
);

const addressSchema = z.object({
	country: z.string().nonempty(),
	postcode: z.string().nonempty()
});

const orderFormSchema = addressSchema.extend({
	firstName: z.string().nonempty(),
	lastName: z.string().nonempty(),
	email: z.string().email()
});

type OrderFormValues = z.infer<typeof orderFormSchema>;
type DeliveryFormValues = z.infer<typeof addressSchema>;

export function createOrderForm() {
	const form = createForm<OrderFormValues>({
		initialValues: get(formValues),
		extend: validator({ schema: orderFormSchema }),
		onSubmit: (values) => {
			console.log(values);
		}
	});

	form.data.subscribe((values) => {
		formValues.set(values);
	});

	return form;
}

export function createDeliveryForm() {
	const storedformValues = get(formValues);
	const form = createForm<DeliveryFormValues>({
		initialValues: {
			postcode: storedformValues.postcode,
			country: storedformValues.country
		},
		extend: validator({ schema: addressSchema }),
		onSubmit: (values) => {
			formValues.update((orderObject) => ({
				...orderObject,
				country: values.country,
				postcode: values.postcode
			}));
			console.log(values);
		}
	});

	return form;
}

formValues.subscribe((values) => {
	storage.set(FORMS_STORAGE_KEY, values);
});
