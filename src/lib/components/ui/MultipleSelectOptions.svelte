<script>
	import Button from './Button.svelte';
	let { options, onchoose } = $props();

	const clases = [
		'p-2',
		'h-[500%]',
		'no-scrollbar',
		'overflow-scroll',
		'absolute',
		'top-[110%]',
		'flex',
		'flex-col',
		'gap-2',
		'w-full',
		'preset-bordered-card',
		'z-50',
		'bg-surface-50'
	];
</script>

<div class={clases}>
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
</div>
