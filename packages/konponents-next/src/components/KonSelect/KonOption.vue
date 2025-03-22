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
const closeSelect = inject<() => void>("close");

function handleBlur(e: FocusEvent){
	if(!selectRef?.value || !closeSelect) return;
	if(!selectRef.value.contains(e.relatedTarget as Element)){
		closeSelect();
	}
}

defineExpose({
	props
});
</script>