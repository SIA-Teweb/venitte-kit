<script lang="ts">
	import countries from '$lib/constants/countries.json';
	import Input from './Input.svelte';
	import { untrack } from 'svelte';
	import NewSelect from './NewSelect.svelte';

	let { name, value = $bindable() } = $props();

	const countryPhoneCodes = countries.map((c) => ({
		label: `+${c.code} ${c.label}`,
		value: `+${c.code}`
	}));

	let code = $state('+371');
	let number = $state('');
	let hiddenInput: HTMLInputElement;

	let derivedFullValue = $derived(code + number);

	$effect(() => {
		if (value !== derivedFullValue) {
			value = derivedFullValue;

			if (hiddenInput) {
				hiddenInput.value = derivedFullValue;
				hiddenInput.dispatchEvent(new Event('input', { bubbles: true }));
				hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
			}
		}
	});

	$effect(() => {
		if (value !== derivedFullValue) {
			const currentFull = untrack(() => derivedFullValue);

			if (value !== currentFull) {
				const matchingCode = countryPhoneCodes.find((c) => value?.startsWith(c.value));

				if (matchingCode) {
					code = matchingCode.value;
					number = value.slice(matchingCode.value.length);
				} else if (value) {
					number = value;
				}
			}
		}
	});
</script>

<div class="flex gap-2">
	<NewSelect class="w-1/3" bind:value={code} options={countryPhoneCodes} />
	<Input class="w-2/3" placeholder="20483529" bind:value={number} />
	<input type="hidden" {name} bind:this={hiddenInput} />
</div>
