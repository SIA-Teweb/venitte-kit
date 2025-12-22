<script lang="ts">
	let {
		title,
		children,
		controls = undefined,
		subtitle = undefined,
		class: className = undefined
	} = $props();
</script>

<section class="flex flex-col gap-10">
	<div class="flex justify-between gap-4 items-center">
		<div class="flex flex-col">
			<h2 class="text-2xl font-bold">{title}</h2>
			{#if subtitle}
				{@render subtitle()}
			{/if}
		</div>
		{#if controls}
			{@render controls()}
		{/if}
	</div>
	<article class={className}>
		{@render children()}
	</article>
</section>
