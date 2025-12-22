<script lang="ts">
	import { ArrowLeftIcon, ArrowRightIcon } from '@lucide/svelte';
	import { Pagination } from '@skeletonlabs/skeleton-svelte';

	let { totalCount, pageSize, page, onchange } = $props();

	function onPageChange(event: any) {
		page = event.page;
		onchange(event.page);
	}
</script>

<Pagination count={totalCount} {pageSize} {page} onPageChange={(event) => onPageChange(event)}>
	<Pagination.PrevTrigger>
		<ArrowLeftIcon class="size-4" />
	</Pagination.PrevTrigger>
	<Pagination.Context>
		{#snippet children(pagination)}
			{#each pagination().pages as page, index (page)}
				{#if page.type === 'page'}
					<Pagination.Item {...page}>
						{page.value}
					</Pagination.Item>
				{:else}
					<Pagination.Ellipsis {index}>&#8230;</Pagination.Ellipsis>
				{/if}
			{/each}
		{/snippet}
	</Pagination.Context>
	<Pagination.NextTrigger>
		<ArrowRightIcon class="size-4" />
	</Pagination.NextTrigger>
</Pagination>
