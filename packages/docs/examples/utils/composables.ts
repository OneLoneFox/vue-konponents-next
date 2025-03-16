import { ref } from "vue";

function useFakeLoading() {
	const progress = ref(0);
	const isLoading = ref(false);
	function start() {
		if (isLoading.value) {
			return;
		}
		progress.value = 0;
		isLoading.value = true;
		increment();
	}
	function increment() {
		const wait = (Math.random() * 100) + 400;
		const advance = (Math.random() * 20) + 5;
		const newVal = progress.value + advance;
		progress.value = newVal > 100 ? 100 : newVal;
		
		if (progress.value >= 100) {
			isLoading.value = false;
			return;
		}

		setTimeout(increment, wait);
	}
	return {
		isLoading,
		progress,
		start
	};
}

export { useFakeLoading };