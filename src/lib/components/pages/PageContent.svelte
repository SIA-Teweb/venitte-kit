<script lang="ts">
	import { locale } from '$lib/translations';
	import Section from '../ui/Section.svelte';

	let { page } = $props();

	const clases = [
		'[&_h2]:text-xl',
		'[&_h2]:font-semibold',
		'[&_h2]:my-4',
		'[&_p]:text-justify',
		'[&_p]:mt-2',
		'[&_p]:indent-4'
	];
</script>

<Section title={page.name.translations[$locale].content} class={clases}>
	{@html page.text.translations[$locale].content}
</Section>
