<template>
	<KonProgressCircular :value="0" />
	<KonProgressCircular :value="25" />
	<KonProgressCircular :value="50" />
	<KonProgressCircular :value="75" />
	<KonProgressCircular :value="100" />
	<KonProgressCircular :value="progress" />
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useFakeLoading } from "../utils/composables";

const { progress, start } = useFakeLoading();

start();

watch(progress, () => {
	
	if(progress.value == 100){
		setTimeout(start, 2000);
	}
});
</script>