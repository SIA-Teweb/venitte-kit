<script lang="ts">
	import PageContent from '$lib/components/pages/PageContent.svelte';
	import SkeletonPageContent from '$lib/components/pages/SkeletonPageContent.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

{#await data.streamed.pagePromise}
	<SkeletonPageContent />
{:then page}
	<PageContent {page} />
{/await}
