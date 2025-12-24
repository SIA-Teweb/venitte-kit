<script lang="ts">
	import { locale, t } from '$lib/translations';
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import z from 'zod';
	import FormItem from '../ui/FormItem.svelte';
	import Input from '../ui/Input.svelte';
	import Button from '../ui/Button.svelte';
	import { Grid2X2Check, XIcon } from '@lucide/svelte';
	import { api } from '$lib/helpers/api';
	import { goto } from '$app/navigation';
	import { route, ROUTES } from '$lib/constants/routes';
	import { showErrorToast } from '$lib/helpers/toaster';

	const schema = z.object({
		email: z.string().email($t('errors.invalidMail')),
		code: z.string()
	});

	const { form, errors } = createForm<z.infer<typeof schema>>({
		extend: validator({ schema: schema }),
		onSubmit: (values) => {
			api.orders
				.checkOrder({
					code: values.code,
					email: values.email
				})
				.then(() => {
					goto(route(ROUTES.HOME, $locale));
				})
				.catch((error) =>
					showErrorToast({
						description: error.status === 404 ? $t('shop.noSuchOrder') : $t('errors.internalError')
					})
				);
		}
	});
</script>

<form use:form class="flex flex-col gap-2">
	<FormItem label={$t('shop.code')} errors={$errors.code}>
		<Input name="code" />
	</FormItem>
	<FormItem label={$t('common.email')} errors={$errors.email}>
		<Input name="email" />
	</FormItem>
	<div class="mt-4 flex gap-2 flex-wrap">
		<Button type="submit" icon={Grid2X2Check} label={$t('shop.checkLink')} full />
		<Button icon={XIcon} preset="tonal" label={$t('common.cancel')} full />
	</div>
</form>
