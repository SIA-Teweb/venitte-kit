<script lang="ts">
	import { t } from '$lib/translations';
	import FormItem from '../ui/FormItem.svelte';
	import Input from '../ui/Input.svelte';
	import Section from '../ui/Section.svelte';
	import Select from '../ui/Select.svelte';
	import countries from '$lib/constants/countries.json';
	import { Steps } from '@skeletonlabs/skeleton-svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import Button from '../ui/Button.svelte';
	import TextArea from '../ui/TextArea.svelte';
	import Checkbox from '../ui/Checkbox.svelte';
	import { isMobileScreen } from '$lib/helpers/layout';
	import { formValues } from '$lib/stores/forms';

	let { orderForm } = $props();
	const { errors } = $derived(orderForm);

	const steps = [
		{ title: $t('shop.contactData') },
		{ title: $t('shop.delivery') },
		{ title: $t('shop.additional') }
	];
</script>

<Section title={$t('shop.placeOrder')} class="preset-bordered-card block">
	<Steps
		orientation={isMobileScreen() ? 'horizontal' : 'vertical'}
		count={steps.length - 1}
		class="w-full gap-16 md:p-4"
	>
		<Steps.List>
			{#each steps as item, index}
				<Steps.Item {index}>
					<Steps.Trigger class="flex gap-4 flex-col md:flex-row">
						<Steps.Indicator>{index + 1}</Steps.Indicator>
						{item.title}
					</Steps.Trigger>
					{#if index < steps.length - 1}
						<Steps.Separator />
					{/if}
				</Steps.Item>
			{/each}
		</Steps.List>
		<div class="flex flex-col grow">
			{#each steps as item, index}
				<Steps.Content {index} class="flex flex-col gap-4">
					{#if index === 0}
						<FormItem label={$t('common.name')} errors={$errors.firstName}>
							<Input name="firstName" bind:value={$formValues.firstName} placeholder="Jānis" />
						</FormItem>
						<FormItem label={$t('common.surname')} errors={$errors.lastName}>
							<Input name="lastName" bind:value={$formValues.lastName} placeholder="Berziņš" />
						</FormItem>
						<FormItem label={$t('common.email')} errors={$errors.email}>
							<Input
								name="email"
								bind:value={$formValues.email}
								placeholder="janis.berzins@venitte.shop"
							/>
						</FormItem>
					{:else if index === 1}
						<FormItem label={$t('common.country')}>
							<Select
								name="country"
								options={countries.map((country) => ({
									label: $t(`common.countries.${country.label}`),
									value: country.iso
								}))}
								bind:value={$formValues.country}
							/>
						</FormItem>
						<FormItem label={$t('common.postcode')}>
							<Input name="postcode" bind:value={$formValues.postcode} />
						</FormItem>
						<FormItem label={$t('common.city')}>
							<Input />
						</FormItem>
					{:else if index === 2}
						<FormItem label={$t('shop.promocode')}>
							<Input />
						</FormItem>
						<FormItem label={$t('shop.comments')}>
							<TextArea />
						</FormItem>
						<Checkbox name="agreed" label={$t('shop.agreeRules')} />
					{/if}
					<div class="flex justify-between items-center gap-2 mt-4">
						<Steps.PrevTrigger>
							<Button preset="tonal" icon={ChevronLeft} label="Back" />
						</Steps.PrevTrigger>
						<Steps.NextTrigger>
							<Button preset="tonal" afterIcon={ChevronRight} label="Next" />
						</Steps.NextTrigger>
					</div>
				</Steps.Content>
			{/each}
		</div>
	</Steps>
</Section>
