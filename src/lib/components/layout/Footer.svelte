<script lang="ts">
	import { route, ROUTES } from '$lib/constants/routes';
	import { createDialog } from '$lib/stores/dialogs';
	import { locale, t } from '$lib/translations';
	import CheckOrderForm from '../widgets/CheckOrderForm.svelte';
	import Contacts from '../widgets/Contacts.svelte';
	import DeliveryTerms from '../widgets/DeliveryTerms.svelte';

	const currentYear = new Date().getFullYear();

	function openContacts() {
		createDialog({
			title: $t('common.contacts'),
			content: {
				component: Contacts
			}
		});
	}

	function openShippingRules() {
		createDialog({
			title: $t('common.shippingRules'),
			content: {
				component: DeliveryTerms
			}
		});
	}

	function openOrderCheckDialog() {
		createDialog({
			title: $t('shop.checkLink'),
			content: {
				component: CheckOrderForm
			}
		});
	}
</script>

<footer class="flex flex-col gap-4 bg-surface-100/50 items-center p-6 w-full">
	<div class="flex gap-x-6 gap-y-2 justify-center flex-wrap">
		<a href={`${route(ROUTES.PAGE, $locale)}/privacy`}>{$t('common.privacy')}</a>
		<a href={`${route(ROUTES.PAGE, $locale)}/rules`}>{$t('common.rules')}</a>
		<button on:click={openOrderCheckDialog}>{$t('shop.checkLink')}</button>
		<button on:click={openContacts}>{$t('common.contacts')}</button>
		<button on:click={openShippingRules}>{$t('common.shippingRules')}</button>
	</div>

	<!-- TrustBox widget - Micro Review Count -->
	<div
		class="trustpilot-widget"
		data-locale="en-EN"
		data-template-id="5419b6a8b0d04a076446a9ad"
		data-businessunit-id="6509ac4296daca9624c0bf39"
		data-style-height="24px"
		data-style-width="100%"
		data-theme="light"
		data-min-review-count="50"
		data-style-alignment="center"
	>
		<a href="https://ru.trustpilot.com/review/www.venitte.shop" target="_blank" rel="noopener">
			Trustpilot
		</a>
	</div>
	<!-- End TrustBox widget -->

	<div>
		<span class="copyright"> © Venitte {currentYear}</span>
	</div>
</footer>
