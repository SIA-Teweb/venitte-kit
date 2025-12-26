<script>
	import Button from './Button.svelte';
	let {
		options,
		onchoose,
		class: className = '',
		closeDialog,
		closePopover,
		closeOnChoose = false
	} = $props();
</script>

<div class="flex flex-col gap-2 w-full {className} max-h-52 overflow-scroll no-scrollbar">
	{#each options as option}
		<Button
			preset={option.active ? 'primary' : 'ghost'}
			label={option.label}
			onclick={() => {
				onchoose(option.value);
				if (closeOnChoose) {
					closePopover?.();
					closeDialog?.();
				}
			}}
			full
			isMenu
		/>
	{/each}
</div>
