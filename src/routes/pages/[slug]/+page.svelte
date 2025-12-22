<script lang="ts">
	import Section from '$lib/components/ui/Section.svelte';
	import { locale } from '$lib/translations';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const clases = [
		'[&_h2]:text-xl',
		'[&_h2]:font-semibold',
		'[&_h2]:my-4',
		'[&_p]:text-justify',
		'[&_p]:mt-2',
		'[&_p]:indent-4'
	];
</script>

{#await data.pagePromise then page}
	<Section title={page.name.translations[$locale].content} class={clases}>
		{@html page.text.translations[$locale].content}
	</Section>
{/await}
