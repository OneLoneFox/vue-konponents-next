<template>
	<button 
		class="kon-option" 
		:class="{'selected': selected}"
		:disabled="disabled"
		:aria-selected="selected ? 'true' : 'false'"
		tabindex="-1"
		type="button"
		role="option"
		v-ripple
	>
		<!-- 
            @slot Option Content
                @binding {boolean} isSelected is this option selected
         -->
		<slot :selected="selected" />
	</button>
</template>


<script setup lang="ts">
import { rippleDirective as vRipple } from "@/directives/kon-ripple";
interface Props {
	selected?: boolean;
	label?: string;
	disabled?: boolean;

}
withDefaults(defineProps<Props>(), {
	label: ""
});
</script>