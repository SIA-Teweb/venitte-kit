<script lang="ts">
	import { route, ROUTES } from '$lib/constants/routes';
	import { locale, t } from '$lib/translations';
	import type { Category } from '$lib/types/categories';

	let { categories }: { categories: Category[] } = $props();

	function generateLink(index: number): string {
		const path = categories
			.slice(0, index + 1)
			.map((c) => c.link)
			.join('/');

		return route(`${ROUTES.SHOP}/${path}`, $locale);
	}
</script>

<div class="flex grow">
	<a href={route(ROUTES.HOME, $locale)} class="not-last:after:content-['»'] not-last:after:mx-1">
		{$t('common.home')}
	</a>
	{#each categories as category, index}
		<a href={generateLink(index)} class="not-last:after:content-['»'] not-last:after:mx-1">
			{category.name[$locale]}
		</a>
	{/each}
</div>
