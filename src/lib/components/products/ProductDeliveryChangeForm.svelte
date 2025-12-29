<script lang="ts">
	import { createDeliveryForm, formValues } from '$lib/stores/forms';
	import { t } from '$lib/translations';
	import FormItem from '../ui/FormItem.svelte';
	import Input from '../ui/Input.svelte';
	import countries from '$lib/constants/countries.json';
	import { Check, XIcon } from '@lucide/svelte';
	import Button from '../ui/Button.svelte';
	import NewSelect from '../ui/NewSelect.svelte';

	let { closeDialog = undefined, closePopover = undefined } = $props();

	function closeForm() {
		closeDialog?.();
		closePopover?.();
	}

	const deliveryForm = createDeliveryForm();
	const { errors } = deliveryForm;
</script>

<form use:deliveryForm.form class="flex flex-col gap-2" onfeltesuccess={closeForm}>
	<FormItem label={$t('common.country')} errors={$errors.country}>
		<NewSelect
			name="country"
			options={countries.map((country) => ({
				label: $t(`common.countries.${country.label}`),
				value: country.iso
			}))}
			value={$formValues.country}
		/>
	</FormItem>
	<FormItem label={$t('common.postcode')} errors={$errors.postcode}>
		<Input name="postcode" autocomplete="postal-code" value={$formValues.postcode} />
	</FormItem>
	<div class="mt-4 flex gap-2 flex-wrap">
		<Button type="submit" preset="primary" icon={Check} label={$t('common.saveChanges')} full />
		<Button preset="tonal" icon={XIcon} label={$t('common.cancel')} onclick={closeForm} full />
	</div>
</form>
