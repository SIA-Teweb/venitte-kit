<script lang="ts">
	import { Slider } from '@skeletonlabs/skeleton-svelte';
	import Input from './Input.svelte';
	import { toMoney } from '$lib/helpers/strings';
	import { onMount } from 'svelte';
	let { min, max, minValue, maxValue } = $props();

	let sliderValue = $state([0, 100]);

	let onePercent = $derived((min + max) / 100);

	function onSliderMove(value: number[]) {
		sliderValue = value;
		minValue = Math.round(onePercent * sliderValue[0]);
		maxValue = Math.round(onePercent * sliderValue[1]);
	}

	function onManualInput(input: 'min' | 'max') {
		switch (input) {
			case 'min':
				const newMinValue = minValue / onePercent;
				sliderValue = [newMinValue, sliderValue[1]];
				break;
			case 'max':
				const newMaxValue = maxValue / onePercent;
				sliderValue = [sliderValue[1], newMaxValue];
		}
	}

	onMount(() => {
		onSliderMove(sliderValue);
	});
</script>

<div class="flex gap-2">
	<Input bind:value={minValue} oninput={() => onManualInput('min')} />
	<Input bind:value={maxValue} oninput={() => onManualInput('max')} />
</div>
<Slider class="py-4" value={sliderValue} onValueChange={(details) => onSliderMove(details.value)}>
	<Slider.Control>
		<Slider.Track>
			<Slider.Range />
		</Slider.Track>
		<Slider.Thumb index={0}>
			<Slider.HiddenInput />
		</Slider.Thumb>
		<Slider.Thumb index={1}>
			<Slider.HiddenInput />
		</Slider.Thumb>
	</Slider.Control>
	<Slider.MarkerGroup>
		<Slider.Marker value={0}>{toMoney(min, true)}</Slider.Marker>
		<Slider.Marker value={50}>{toMoney(Math.round((min + max) / 2), true)}</Slider.Marker>
		<Slider.Marker value={100}>{toMoney(max, true)}</Slider.Marker>
	</Slider.MarkerGroup>
</Slider>
