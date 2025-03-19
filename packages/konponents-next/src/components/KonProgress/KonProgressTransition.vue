<template>
	<Transition
		@enter="onEnter"
		@leave="onLeave"
		:css="false"
	>
		<slot />
	</Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";

const handle = ref<number|null>(null);

function propTransition(el: Element, done: () => void, startValue: number, endValue: number){
	if(handle.value){
		cancelAnimationFrame(handle.value);
	}
	const trackEls = el.querySelectorAll<SVGElement>(".kon-progress-track");
	
	const strokeEl = el.querySelector<SVGElement>(".kon-progress-stroke");
	if(!strokeEl || !trackEls.length){
		done();
		return;
	}
	console.log(trackEls, trackEls.length);
	trackEls.forEach((el) => el.style.setProperty("--stroke-scale", startValue.toString()));
	strokeEl.style.setProperty("--stroke-scale", startValue.toString());
	requestAnimationFrame(() => {
		trackEls.forEach((el) => el.style.setProperty("--stroke-scale", endValue.toString()));
		strokeEl.style.setProperty("--stroke-scale", endValue.toString());
		/**
		 * Listen to the stroke-width transition end or cancel
		 * remove the listeners and trigger transition done to
		 * remove the Element from the DOM.
		 */
		const onDone = (e: TransitionEvent) => {
			if(["stroke-width", "transform"].includes(e.propertyName) == false){
				done();
				return;
			}
			strokeEl.removeEventListener("transitionend", onDone);
			strokeEl.removeEventListener("transitioncancel", onDone);
			done();
		};
		strokeEl.addEventListener("transitionend", onDone);
		strokeEl.addEventListener("transitioncancel", onDone);
	});
}

function onEnter(el: Element, done: () => void){
	propTransition(el, done, 0, 1);
}

function onLeave(el: Element, done: () => void) {
	propTransition(el, done, 1, 0);
}
</script>