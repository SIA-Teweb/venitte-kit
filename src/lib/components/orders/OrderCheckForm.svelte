<script lang="ts">
	import { t } from '$lib/translations';
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import z from 'zod';
	import FormItem from '../ui/FormItem.svelte';
	import Input from '../ui/Input.svelte';
	import Button from '../ui/Button.svelte';
	import { Check, Hash, Mail, XIcon } from '@lucide/svelte';
	import { api } from '$lib/helpers/api';
	import { showErrorToast } from '$lib/helpers/toaster';

	let { response = $bindable(undefined) } = $props();

	const schema = z.object({
		email: z.string().email('invalidMail'),
		code: z.string().nonempty('required')
	});

	let isLoading = $state(false);

	const { form, errors } = createForm<z.infer<typeof schema>>({
		extend: validator({ schema: schema }),
		onSubmit: (values) => {
			isLoading = true;

			api.orders
				.checkOrder({
					code: values.code,
					email: values.email
				})
				.then((order) => {
					response = order;
				})
				.catch((error) =>
					showErrorToast({
						description: $t('shop.noSuchOrder')
					})
				)
				.finally(() => {
					isLoading = false;
				});
		}
	});
</script>

<form use:form class="flex flex-col gap-2">
	<FormItem label={$t('shop.code')} errors={$errors.code}>
		<Input icon={Hash} placeholder="23090662" name="code" />
	</FormItem>
	<FormItem label={$t('common.email')} errors={$errors.email}>
		<Input icon={Mail} placeholder="janis.berzins@venitte.shop" name="email" />
	</FormItem>
	<div class="mt-4 flex gap-2 flex-wrap">
		<Button type="submit" icon={Check} label={$t('shop.checkLink')} full {isLoading} />
	</div>
</form>
