
function calculateRipple(e: MouseEvent, targetElement: Element) {
	// Say we have an element at x = 50 and y = 50 on screen space
	const offset = targetElement.getBoundingClientRect();
	/*
	 * We need to get the local click coordinate
	 * imagine we clicked at x = 10 y = 10 at local space on the component
	 * e.clientX will be 60 and e.clientY will be 60 too
	 * if we need local coordinates that's easy we simply substract the component position from the click position
	 * 60 - 50 = 10
	 */
	const dx = e.clientX - offset.left;
	const dy = e.clientY - offset.top;

	/**
	 * Create the largest triangle from a corner to the local click coords
	 * The horizontal and vertical offsets are always positive
	 * We add them to the half width and half height of the element
	 * to get the largest possible triangle
	 * + = center | * = click
	 * 
	 * -------------------		-------------------
	 * |                 |		| ...........     |
	 * |           *     |		|   .       .     |
	 * |         . .     |		|     .     .     |
	 * |       . + .     |	or	|       . + .     |
	 * |     .     .     |		|         . .     |
	 * |   .       .     |		|           *     |
	 * | ...........     |		|                 |
	 * -------------------		-------------------
	 * 
	 * Or any other coordinate, you get the idea
	 */
	const halfWidth = targetElement.clientWidth / 2;
	const halfHeight = targetElement.clientHeight / 2;
	const HOffsetFromCenter = Math.abs(halfWidth - dx);
	const VOffsetFromCenter = Math.abs(halfHeight - dy);
	const largestTriangle = {
		width: halfWidth + HOffsetFromCenter,
		height: halfHeight + VOffsetFromCenter
	};


	/**
	 * The radius is just the hypotenuse of the triangle we obtained.
	 * This will help us make a circle that extends to just the corner of the element
	 */
	const radius = Math.sqrt(Math.pow(largestTriangle.width, 2) + Math.pow(largestTriangle.height, 2));

	return { dx, dy, radius };
}

function addRippleElement(parent: Element, duration: number, dx: number, dy: number, radius: number) {
	const rippleElement = document.createElement("div");
	rippleElement.classList.add("kon-ripple");
	rippleElement.style.setProperty("--duration", `${duration}ms`);
	rippleElement.style.setProperty("--dx", `${dx}px`);
	rippleElement.style.setProperty("--dy", `${dy}px`);

	parent.appendChild(rippleElement);

	/* Force repaint */
	void parent.clientHeight;

	const diameter = radius * 2;
	rippleElement.style.setProperty("--opacity", "0.15");
	rippleElement.style.setProperty("--dw", `${diameter}px`);
	rippleElement.style.setProperty("--dh", `${diameter}px`);
	return rippleElement;
}

function ripple(e: MouseEvent, duration = 350) {
	const element = e.currentTarget as Element;
	if (!element) return;

	let released = false;
	let completed = false;
	setTimeout(() => {
		completed = true;
		if (released && completed) {
			removeRipple();
		}
	}, duration);

	const { dx, dy, radius } = calculateRipple(e, element);

	const rippleElement = addRippleElement(element, duration, dx, dy, radius);

	function removeRipple() {
		rippleElement.style.setProperty("--opacity", "0");
		setTimeout(() => {
			// Remove the ripple element after the fadeout ends
			element.removeChild(rippleElement);
		}, duration);
		element.removeEventListener("mouseup", onRelease);
		element.removeEventListener("mouseleave", onRelease);
	}

	function onRelease() {
		released = true;
		if (released && completed) {
			removeRipple();
		}
	}

	// remove effect element after mouse leaves the element or click ends
	element.addEventListener("mouseup", onRelease);
	element.addEventListener("mouseleave", onRelease);
};

function keyboardRipple(e: KeyboardEvent, duration = 350) {
	const element = e.currentTarget as HTMLElement;
	if (!element) return;

	let released = false;
	let completed = false;
	setTimeout(() => {
		completed = true;
		if (released && completed) {
			removeRipple();
		}
	}, duration);

	const halfWidth = element.clientWidth / 2;
	const halfHeight = element.clientHeight / 2;
	const radius = Math.max(halfWidth, halfHeight);

	const rippleElement = addRippleElement(element, duration, halfWidth, halfHeight, radius);

	function removeRipple() {
		rippleElement.style.setProperty("--opacity", "0");
		setTimeout(() => {
			// Remove the ripple element after the fadeout ends
			element.removeChild(rippleElement);
		}, duration);
		element.removeEventListener("keyup", onRelease);
		element.removeEventListener("focusout", onRelease);
	}

	function onRelease() {
		released = true;
		if (released && completed) {
			removeRipple();
		}
	}

	element.addEventListener("keyup", onRelease);
	element.addEventListener("focusout", onRelease);
}

export { keyboardRipple };

export default ripple;