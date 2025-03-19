<template>
	<button 
		class="kon-button"
		:class="[
			type ? `kon-${type}` : '',
			{
				'kon-icon': icon,
				'kon-danger': danger,
				'kon-loading': loading,
				'kon-loading-disable': loading && disableOnLoading
			}
		]"
		v-ripple
		:disabled="disabled || (loading && disableOnLoading)"
	>
		<span class="kon-content">
			<span v-if="$slots.leading" class="kon-leading">
				<!-- Leading content (before the default slot) -->
				<slot name="leading" />
			</span>
			<!-- Default slot -->
			<slot />
			<span v-if="$slots.trailing" class="kon-trailing">
				<!-- Trailing content (after the default slot) -->
				<slot name="trailing" />
			</span>
		</span>
		<KonProgressTransition>
			<span class="kon-button-loader" v-if="!!loading">
				<template v-if="$slots.loader">
					<!-- Slot used for custom progress bars -->
					<slot name="loader" />
				</template>
				<template v-else>
					<KonProgressCircular
						:size="24"
						:indeterminate="loadingProgress == undefined"
						:value="loadingProgress"
					/>
				</template>
			</span>
		</KonProgressTransition>
	</button>
</template>

<script setup lang="ts">
import { rippleDirective as vRipple } from "@/directives/kon-ripple";
import KonProgressCircular from "../KonProgress";
import { KonProgressTransition } from "../KonProgress";

interface Props {
	/**
	 * The button variant.
	 */
	type?: "tonal" | "text" | "border";
	/**
	 * Disable button interactions.
	 */
	disabled?: boolean;
	/**
	 * Shows the loader and hides content. (See loader slot).
	 */
	loading?: boolean;
	/**
	 * Disables the button when loading is true.
	 */
	disableOnLoading?: boolean;
	/**
	 * The current value of the default loader, between 0-100.
	 * 
	 * Leave as undefined to use an indeterminate loader.
	 */
	loadingProgress?: number;
	/**
	 * Makes the button have equal padding on all sides, useful for icon only buttons.
	 */
	icon?: boolean;
	/**
	 * Determines if the button uses danger colors. (uses --kon-error-* colors).
	 */
	danger?: boolean;
};
withDefaults(defineProps<Props>(), {
	disableOnLoading: true,
});
</script>