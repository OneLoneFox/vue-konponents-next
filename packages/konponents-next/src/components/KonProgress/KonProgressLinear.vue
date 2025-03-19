<template>
	<div
		class="kon-progress kon-progress-linear"
		:class="{'kon-indeterminate': indeterminate}"
		:style="variables"
		:aria-valuenow="indeterminate ? undefined : clampedValue.toFixed(2)"
	>
		<div
			class="kon-progress-track kon-before"
			v-if="indeterminate"
		/>
		<div class="kon-progress-stroke">
			<template v-if="indeterminate">
				<div class="kon-indeterminate-stroke-1" />
				<div class="kon-indeterminate-stroke-2" />
			</template>
		</div>
		<div class="kon-progress-track kon-after" />
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
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
	strokeWidth: 4,
	value: 0,
	indeterminate: false,
});

const clampedValue = computed(() => {
	return Math.min(Math.max(props.value, 0), 100);
});

const variables = computed(() => {
	return {
		"--stroke-width": props.strokeWidth,
		/* when 0 set to -1 to make up for the gap */
		"--value": clampedValue.value == 0 ? -1 : clampedValue.value,
	};
});
</script>