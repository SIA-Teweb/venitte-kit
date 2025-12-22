<script lang="ts">
	import { BASE_API_URI } from '$lib/constants/uri';

	let { src, alt, clases = '' } = $props();

	let isLoaded: boolean = $state(false);
</script>

<div class="w-full h-full bg-transparent border-0">
	{#if !isLoaded}
		<div class={[clases, 'placeholder animate-pulse']}></div>
	{/if}
	<img
		class={[clases, isLoaded ? 'flex' : 'hidden', 'w-full h-full']}
		src={BASE_API_URI + src}
		{alt}
		onload={() => (isLoaded = true)}
	/>
</div>
