<script>
	import Button from './Button.svelte';
	let { options, onchoose, class: className = '' } = $props();
</script>

<div class="flex flex-col gap-2 w-full {className}">
	{#key options}
		{#each options as option}
			<Button
				preset={option.active ? 'primary' : 'ghost'}
				label={option.label}
				onclick={() => {
					onchoose(option.value);
				}}
				full
				isMenu
			/>
		{/each}
	{/key}
</div>
