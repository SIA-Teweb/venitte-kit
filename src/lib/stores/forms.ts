import { FORMS_STORAGE_KEY } from '$lib/constants/storage';
import storage from '$lib/helpers/storage';
import { validator } from '@felte/validator-zod';
import { createForm } from 'felte';
import { get, writable } from 'svelte/store';
import { z, type RefinementCtx } from 'zod';
import countries from '$lib/constants/countries.json';

export const formValues = writable<OrderFormValues>(
	storage.get<OrderFormValues>(FORMS_STORAGE_KEY) ?? {
		country: '',
		postcode: '',
		firstname: '',
		lastname: '',
		email: '',
		phone: '',
		city: '',
		address: '',
		deliveryType: null,
		deliveryDestination: null,
		paymentApi: 'stripe',
		promocode: '',
		comment: '',
		rulesAgreed: false
	}
);

const addressShape = z.object({
	country: z.string().nonempty('required'),
	postcode: z.string().nonempty('required')
});

const orderFormShape = addressShape.extend({
	firstname: z.string().nonempty('required'),
	lastname: z.string().nonempty('required'),
	email: z.string().nonempty('required').email('invalidMail'),
	phone: z
		.string()
		.nonempty('required')
		.regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'invalidMobileNumber'),
	city: z.string().nonempty('required'),
	address: z.string(),
	deliveryType: z.any(),
	deliveryDestination: z.any(),
	paymentApi: z.any(),
	promocode: z.string().optional(),
	comment: z.string().optional(),
	rulesAgreed: z.boolean()
});

type OrderFormValues = z.infer<typeof orderFormShape>;
type DeliveryFormValues = z.infer<typeof addressShape>;

const validatePostcode = (data: DeliveryFormValues, ctx: RefinementCtx) => {
	const regex = countries.find((country) => country.iso === data.country)?.postcodeRegex;

	if (regex && !new RegExp(regex).test(data.postcode)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'invalidRegex',
			path: ['postcode']
		});
	}
};

const addressSchema = addressShape.superRefine(validatePostcode);
const orderFormSchema = orderFormShape.superRefine(validatePostcode);

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
