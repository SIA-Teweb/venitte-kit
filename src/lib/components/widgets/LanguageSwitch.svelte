<script>
	import { locale, setLocale, t } from '$lib/translations';
	import { ChevronRight } from '@lucide/svelte';
	import Button from '../ui/Button.svelte';
	const languageOptions = [
		{
			label: 'Русский',
			value: 'ru'
		},
		{
			label: 'English',
			value: 'en'
		},
		{
			label: 'Latviešu',
			value: 'lv'
		}
	];
</script>

<div class="flex flex-col gap-2 md:w-[150px] w-full">
	{#each languageOptions as lang}
		<Button
			preset={$locale === lang.value ? 'primary' : 'ghost'}
			afterIcon={ChevronRight}
			label={lang.label}
			onclick={() => setLocale(lang.value)}
			full
			isMenu
		/>
	{/each}
</div>
