import { keyboardRipple, ripple } from "@/helpers";
import type { Directive } from "vue";

function handleClickRipple(e: MouseEvent){
	ripple(e, 350);
}

function handleKeyboardRipple(e: KeyboardEvent){
	if((e.code == "Space" || e.code == "Enter") && !e.repeat){
		keyboardRipple(e, 350);
	}
}

const rippleDirective: Directive = {
	mounted: (el: HTMLElement) => {
		el.addEventListener("mousedown", handleClickRipple);
		el.addEventListener("keydown", handleKeyboardRipple);
	},
	beforeUnmount: (el: HTMLElement) => {
		el.removeEventListener("mousedown", handleClickRipple);
		el.removeEventListener("keydown", handleKeyboardRipple);
	}
};

export { rippleDirective };