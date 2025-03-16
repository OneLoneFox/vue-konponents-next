<template>
	<button 
		class="kon-button"
		:class="[
			props.type ? `kon-${props.type}` : '',
			{
				'kon-icon': !!props.icon,
				'kon-danger': !!props.danger,
				'kon-loading': !!props.loading,
				'kon-loading-disable': !!props.loading && !!props.disableOnLoading
			}
		]"
		v-ripple
		:disabled="!!props.disabled || (!!props.loading && !!props.disableOnLoading)"
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
		<KonProgressTransition :stroke-width="4" v-slot="{ strokeWidth }">
			<span class="kon-button-loader" v-if="!!props.loading">
				<template v-if="$slots.loader">
					<!-- Slot used for custom progress bars -->
					<slot name="loader" />
				</template>
				<template v-else>
					<KonProgressCircular
						:stroke-width="strokeWidth"
						:size="24"
						:indeterminate="props.loadingProgress == undefined"
						:value="props.loadingProgress"
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
	 * The loading progress value used by the default loader, leave as undefined to use an indeterminate loader.
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
const props = withDefaults(defineProps<Props>(), {
	disableOnLoading: true,
});
</script>