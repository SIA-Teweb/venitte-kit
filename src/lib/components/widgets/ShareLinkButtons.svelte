<script lang="ts">
	import { page } from '$app/state';
	import { isMobileScreen } from '$lib/helpers/layout';
	import WhatsAppIcon from '$lib/assets/social/whatsapp.svg';
	import XIcon from '$lib/assets/social/x.svg';
	import TelegramIcon from '$lib/assets/social/telegram.svg';
	import CopyIcon from '$lib/assets/social/link.svg';
	import MessengerIcon from '$lib/assets/social/messenger.svg';
	import { t } from '$lib/translations';
	import FormItem from '../ui/FormItem.svelte';
	import { showSuccessToast } from '$lib/helpers/toaster';

	interface ShareButton {
		method: string;
		icon: string;
		action?: string | (() => void);
		onlyMobile?: boolean;
	}

	const url = page.url.toString();

	const shareButtons: ShareButton[] = [
		{ method: 'copy', action: copyToClipboard, icon: CopyIcon },
		{ method: 'x', action: `https://x.com/intent/post?url=${url}`, icon: XIcon },
		{
			method: 'messenger',
			action: `fb-messenger://share/?link=${url}`,
			icon: MessengerIcon,
			onlyMobile: true
		},
		{ method: 'whatsapp', action: `https://wa.me/?text=${url}`, icon: WhatsAppIcon },
		{ method: 'telegram', action: `https://telegram.me/share/url?url=${url}`, icon: TelegramIcon }
	];

	function copyToClipboard() {
		navigator.clipboard.writeText(url);
		showSuccessToast({
			description: $t('common.linkCopied')
		});
	}

	function onClick(action: ShareButton['action']) {
		if (typeof action === 'string') {
			window.open(action, '_blank', 'noopener,noreferrer');

			return;
		} else {
			action?.();
		}
	}
</script>

<div class="flex gap-2 md:w-[250px] max-w-full">
	{#each shareButtons as { action, icon, onlyMobile }}
		{#if !onlyMobile || (isMobileScreen() && onlyMobile)}
			<button type="button" onclick={() => onClick(action)}>
				<img src={icon} alt="Share" />
			</button>
		{/if}
	{/each}
</div>
