<script lang="ts">
	let { options, name = undefined, value = $bindable(), onchange = undefined } = $props();

	function onChange(event: Event) {
		const target = event.target as HTMLOptionElement;

		if (!target) return;

		value = target.value;
		onchange?.(value);
	}
</script>

<select {name} class="select" onchange={onChange}>
	{#each options as option}
		<option value={option.value} selected={option.value === value}>{option.label}</option>
	{/each}
</select>
