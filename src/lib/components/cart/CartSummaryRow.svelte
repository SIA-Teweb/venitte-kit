<script lang="ts">
	let { key, value, class: className = '' } = $props();
</script>

<div class="flex justify-between {className}">
	<span>{key}</span>
	<span>{value}</span>
</div>
