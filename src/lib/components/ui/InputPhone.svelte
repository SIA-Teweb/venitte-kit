<script lang="ts">
	import countries from '$lib/constants/countries.json';
	import Input from './Input.svelte';
	import { tick, untrack } from 'svelte';
	import NewSelect from './NewSelect.svelte';

	let { name, value = $bindable() } = $props();

	const countryPhoneCodes = countries.map((c) => ({
		label: `+${c.code} ${c.label}`,
		value: `+${c.code}`
	}));

	function parseValue(val: string | undefined) {
		if (!val) return { code: '+371', number: '' };

		const matchingCode = countryPhoneCodes.find((c) => val.startsWith(c.value));
		if (matchingCode) {
			return { code: matchingCode.value, number: val.slice(matchingCode.value.length) };
		}
		return { code: '+371', number: val };
	}

	const initial = parseValue(value);
	let code = $state(initial.code);
	let number = $state(initial.number);
	let hiddenInput: HTMLInputElement;

	let derivedFullValue = $derived(code + number);

	$effect(() => {
		if (value !== undefined && value !== untrack(() => derivedFullValue)) {
			const parsed = parseValue(value);
			if (parsed.code !== code) code = parsed.code;
			if (parsed.number !== number) number = parsed.number;
		}
	});

	$effect(() => {
		if (derivedFullValue !== untrack(() => value)) {
			value = derivedFullValue;

			tick().then(() => {
				if (hiddenInput) {
					hiddenInput.value = derivedFullValue;
					hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
				}
			});
		}
	});
</script>

<div class="flex gap-2">
	<NewSelect class="w-1/3" bind:value={code} options={countryPhoneCodes} />
	<Input type="tel" class="w-2/3" placeholder="20483529" bind:value={number} />
	<input type="hidden" {name} bind:this={hiddenInput} />
</div>
