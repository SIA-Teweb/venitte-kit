<script lang="ts">
	let { label, name } = $props();
</script>

<label class="flex items-center space-x-2">
	<input {name} class="checkbox" type="checkbox" />
	<p>{label}</p>
</label>
