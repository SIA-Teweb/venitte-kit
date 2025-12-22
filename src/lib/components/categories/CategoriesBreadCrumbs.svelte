<script lang="ts">
	import { ROUTES } from '$lib/constants/routes';
	import { locale, t } from '$lib/translations';
	import type { Category } from '$lib/types/categories';

	let { categories }: { categories: Category[] } = $props();

	function generateLink(index: number): string {
		const path = categories
			.slice(0, index + 1)
			.map((c) => c.link)
			.join('/');

		return `${ROUTES.SHOP}/${path}`;
	}
</script>

<div class="flex grow">
	<a href={ROUTES.HOME} class="not-last:after:content-['»'] not-last:after:mx-1">
		{$t('common.home')}
	</a>
	{#each categories as category, index}
		<a href={generateLink(index)} class="not-last:after:content-['»'] not-last:after:mx-1">
			{category.name[$locale]}
		</a>
	{/each}
</div>
