<template>
	<Transition
		@enter="onEnter"
		@leave="onLeave"
		:css="false"
	>
		<slot :stroke-width="props.strokeWidth" />
	</Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
	strokeWidth?: number;
}
const props = withDefaults(defineProps<Props>(), {
	strokeWidth: 4
});
const handle = ref<number|null>(null);

function propTransition(el: Element, done: () => void, startValue: number, endValue: number){
	if(handle.value){
		cancelAnimationFrame(handle.value);
	}
	const trackEl = el.querySelector<SVGElement>(".kon-progress-track");
	const strokeEl = el.querySelector<SVGElement>(".kon-progress-stroke");
	if(!strokeEl || !trackEl) return;
	trackEl.style.setProperty("--stroke-width", startValue.toString());
	strokeEl.style.setProperty("--stroke-width", startValue.toString());
	requestAnimationFrame(() => {
		trackEl.style.setProperty("--stroke-width", endValue.toString());
		strokeEl.style.setProperty("--stroke-width", endValue.toString());
		/**
		 * Listen to the stroke-width transition end or cancel
		 * remove the listeners and trigger transition done to
		 * remove the Element from the DOM.
		 */
		const onDone = (e: TransitionEvent) => {
			if(["stroke-width", "height"].includes(e.propertyName) == false) return;
			strokeEl.removeEventListener("transitionend", onDone);
			strokeEl.removeEventListener("transitioncancel", onDone);
			done();
		};
		strokeEl.addEventListener("transitionend", onDone);
		strokeEl.addEventListener("transitioncancel", onDone);
	});
}

function onEnter(el: Element, done: () => void){
	propTransition(el, done, 0, props.strokeWidth);
}

function onLeave(el: Element, done: () => void) {
	propTransition(el, done, props.strokeWidth, 0);
}
</script>