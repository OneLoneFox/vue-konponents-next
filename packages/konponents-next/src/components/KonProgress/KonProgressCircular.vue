<template>
	<div
		class="kon-progress kon-progress-circular"
		:class="{'kon-indeterminate': indeterminate}"
		:style="variables"
		role="progressbar"
		:aria-valuenow="indeterminate ? undefined : clampedValue.toFixed(2)"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 40 40"
			width="40"
			height="40"
		>
			<circle
				fill="transparent"
				cx="50%"
				cy="50%"
				:r="radius"
				class="kon-progress-track"
				pathLength="100"
			/>
			<circle 
				fill="transparent"
				cx="50%"
				cy="50%"
				:r="radius"
				class="kon-progress-stroke"
				pathLength="100"
			/>
		</svg>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
	/**
	 * The width and height of the spinner.
	 */
	size?: number;
	/**
	 * The stroke width of the progress bar.
	 */
	strokeWidth?: number;
	/**
	 * The current value of the progress bar, between 0-100.
	 * 
	 * Not available when `indeterminate` is true.
	 */
	value?: number;
	/**
	 * Determines if the progress is indeterminate (doesn't have a progress value).
	 */
	indeterminate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	size: 40,
	strokeWidth: 4,
	value: 0,
	indeterminate: false,
});

const radius = computed(() => {
	/* Half the viewbox minus half the stroke width */
	return 20 - (props.strokeWidth / 2);
});

const clampedValue = computed(() => {
	return Math.min(Math.max(props.value, 0), 100);
});

const variables = computed(() => {
	return {
		"--radius": radius.value,
		"--size": props.size,
		"--stroke-width": props.strokeWidth,
		"--value": clampedValue.value,
	};
});
</script>