<script lang="ts">
	import { t } from '$lib/translations';
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import z from 'zod';
	import FormItem from '../ui/FormItem.svelte';
	import Input from '../ui/Input.svelte';
	import Button from '../ui/Button.svelte';

	const schema = z.object({
		email: z.string(),
		orderNumber: z.string()
	});

	const { form } = createForm<z.infer<typeof schema>>({
		extend: validator({ schema: schema }),
		onSubmit: (values) => {
			console.log(values);
		}
	});
</script>

<form use:form>
	<FormItem label={$t('common.email')}>
		<Input name="email" />
	</FormItem>
	<FormItem label={$t('shop.orderNumber')}>
		<Input name="orderNumber" />
	</FormItem>
	<div class="mt-4">
		<Button label={$t('shop.checkOrder')} />
		<Button label={$t('common.cancel')} />
	</div>
</form>
