<template>
	<button
		:id="id"
		class="kon-option" 
		:class="{'kon-selected': selected}"
		:disabled="disabled"
		:aria-selected="selected ? 'true' : 'false'"
		tabindex="-1"
		role="option"
		v-ripple
		@blur="handleBlur"
	>
		<span class="kon-content">
			<!-- 
				The option's content
				
				@prop {boolean} selected - Wether this option is selected or not
			 -->
			<slot :selected="selected" />
		</span>
	</button>
</template>


<script setup lang="ts">
import { rippleDirective as vRipple } from "@/directives/kon-ripple";
import { inject, type ShallowRef } from "vue";
interface Props {
	id?: string;
	value?: unknown;
	selected?: boolean;
	label?: string;
	disabled?: boolean;

}
const props = withDefaults(defineProps<Props>(), {
	label: ""
});

const selectRef = inject<Readonly<ShallowRef<HTMLDivElement | null>>>("selectRef");
const dropdownRef = inject<Readonly<ShallowRef<HTMLDivElement | null>>>("dropdownRef");
const closeSelect = inject<() => void>("close");

/**
 * Closes the select component if the focus leaves the element.
 */
function handleBlur(e: FocusEvent){
	if(!selectRef?.value || !dropdownRef?.value || !closeSelect) return;
	if(selectRef.value.contains(e.relatedTarget as Element) || dropdownRef.value.contains(e.relatedTarget as Element)) return;
	closeSelect();
}

defineExpose({
	props
});
</script>