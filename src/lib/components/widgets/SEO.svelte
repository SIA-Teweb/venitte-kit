<script lang="ts">
	let { title, description } = $props();
</script>

<svelte:head>
	<title>Venitte {title}</title>
	<meta name="description" content={description} />
</svelte:head>
