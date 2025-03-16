<template>
	<KonProgressLinear :value="0" />
	<KonProgressLinear :value="25" />
	<KonProgressLinear :value="50" />
	<KonProgressLinear :value="75" />
	<KonProgressLinear :value="100" />
	<KonProgressLinear :value="progress" />
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useFakeLoading } from "../utils/composables";

const { progress, start } = useFakeLoading();
start();

watch(progress, () => {
	if(progress.value == 100){
		setTimeout(() => {
			start();
		}, 2000);
	}
});
</script>